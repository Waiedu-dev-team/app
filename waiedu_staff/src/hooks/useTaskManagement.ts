import { useState, useCallback, useMemo } from 'react';
import { Task, TaskStatus, TaskPriority } from '@/types/task';

interface TaskFilters {
  search: string;
  status: string;
  priority: string;
  assignee: string;
  category: string;
  isOverdue: boolean;
}

interface UseTaskManagementProps {
  initialTasks?: Task[];
}

export function useTaskManagement({ initialTasks = [] }: UseTaskManagementProps = {}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    status: 'all',
    priority: 'all', 
    assignee: 'all',
    category: 'all',
    isOverdue: false
  });
  const [sortBy, setSortBy] = useState<keyof Task>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const matchesSearch = filters.search === '' || 
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus = filters.status === 'all' || task.status === filters.status;
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      const matchesAssignee = filters.assignee === 'all' || task.assignedToId === filters.assignee;
      const matchesCategory = filters.category === 'all' || task.category === filters.category;
      
      const isOverdue = new Date(task.dueDate) < new Date() && 
                       task.status !== 'done' && 
                       task.status !== 'cancelled';
      const matchesOverdue = !filters.isOverdue || isOverdue;

      return matchesSearch && matchesStatus && matchesPriority && 
             matchesAssignee && matchesCategory && matchesOverdue;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [tasks, filters, sortBy, sortOrder]);

  // Task management functions
  const createTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  }, [tasks]);

  const updateTask = useCallback((taskId: number, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  }, []);

  const deleteTask = useCallback((taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setSelectedTasks(prev => prev.filter(id => id !== taskId));
  }, []);

  const bulkUpdateTasks = useCallback((taskIds: number[], updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      taskIds.includes(task.id)
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  }, []);

  const bulkDeleteTasks = useCallback((taskIds: number[]) => {
    setTasks(prev => prev.filter(task => !taskIds.includes(task.id)));
    setSelectedTasks([]);
  }, []);

  // Selection functions
  const selectTask = useCallback((taskId: number) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  }, []);

  const selectAllTasks = useCallback(() => {
    const allVisible = filteredAndSortedTasks.map(task => task.id);
    setSelectedTasks(prev => 
      prev.length === allVisible.length ? [] : allVisible
    );
  }, [filteredAndSortedTasks]);

  const clearSelection = useCallback(() => {
    setSelectedTasks([]);
  }, []);

  // Filter functions
  const updateFilter = useCallback((key: keyof TaskFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      status: 'all',
      priority: 'all',
      assignee: 'all', 
      category: 'all',
      isOverdue: false
    });
  }, []);

  // Sort functions
  const updateSort = useCallback((field: keyof Task) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  }, [sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'done').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const overdue = tasks.filter(t => {
      const isOverdue = new Date(t.dueDate) < new Date();
      return isOverdue && t.status !== 'done' && t.status !== 'cancelled';
    }).length;

    return { total, completed, inProgress, overdue };
  }, [tasks]);

  return {
    // Data
    tasks: filteredAndSortedTasks,
    allTasks: tasks,
    selectedTasks,
    filters,
    sortBy,
    sortOrder,
    stats,

    // Task management
    createTask,
    updateTask,
    deleteTask,
    bulkUpdateTasks,
    bulkDeleteTasks,

    // Selection
    selectTask,
    selectAllTasks,
    clearSelection,

    // Filtering & Sorting
    updateFilter,
    clearFilters,
    updateSort,

    // State setters (for direct control if needed)
    setTasks,
    setSelectedTasks,
    setFilters
  };
}
