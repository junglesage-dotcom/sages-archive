import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

// Types
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  role: 'reader' | 'creator' | 'moderator' | 'admin';
  avatar?: string;
  telegramLinked: boolean;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  dismissible: boolean;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  readingFontSize: number;
  readingWidth: 'comfortable' | 'compact' | 'wide';
  bookmarks: string[];
  notifications: Notification[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, displayName: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleTheme: () => void;
  setReadingFontSize: (size: number) => void;
  setReadingWidth: (width: 'comfortable' | 'compact' | 'wide') => void;
  toggleBookmark: (workId: string) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  dismissNotification: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sage_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sage_theme');
    return (saved as 'light' | 'dark') || 'light';
  });
  const [readingFontSize, setReadingFontSize] = useState(() => {
    return parseInt(localStorage.getItem('sage_font_size') || '18');
  });
  const [readingWidth, setReadingWidth] = useState<'comfortable' | 'compact' | 'wide'>(() => {
    return (localStorage.getItem('sage_reading_width') as any) || 'comfortable';
  });
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('sage_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sage_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sage_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sage_theme', theme);
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sage_font_size', String(readingFontSize));
  }, [readingFontSize]);

  useEffect(() => {
    localStorage.setItem('sage_reading_width', readingWidth);
  }, [readingWidth]);

  useEffect(() => {
    localStorage.setItem('sage_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Mock authentication
    await new Promise(r => setTimeout(r, 500));
    const mockUser: User = {
      id: 'user-mock-001',
      email,
      username: email.split('@')[0],
      displayName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      role: 'creator',
      telegramLinked: false,
    };
    setUser(mockUser);
    return true;
  }, []);

  const register = useCallback(async (email: string, username: string, displayName: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 500));
    const mockUser: User = {
      id: 'user-' + Date.now(),
      email,
      username,
      displayName,
      role: 'creator',
      telegramLinked: false,
    };
    setUser(mockUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('sage_user');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);

  const toggleBookmark = useCallback((workId: string) => {
    setBookmarks(prev =>
      prev.includes(workId)
        ? prev.filter(id => id !== workId)
        : [...prev, workId]
    );
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = 'notif-' + Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated: !!user,
      theme,
      readingFontSize,
      readingWidth,
      bookmarks,
      notifications,
      login,
      register,
      logout,
      toggleTheme,
      setReadingFontSize,
      setReadingWidth,
      toggleBookmark,
      addNotification,
      dismissNotification,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
