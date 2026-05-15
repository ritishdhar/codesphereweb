// Mock Auth System — localStorage-based, no database

export interface User {
  id: string;
  name: string;
  email: string;
  branch: string;
  year: string;
  avatar: string;
  xp: number;
  level: number;
  archetype: string;
  joinedAt: string;
}

const STORAGE_KEY = "codesphere_user";
const USERS_DB_KEY = "codesphere_users_db";

// --- Helpers ---
const getUsersDB = (): Record<string, User & { password: string }> => {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_DB_KEY) || "{}");
  } catch {
    return {};
  }
};

const saveUsersDB = (db: Record<string, User & { password: string }>) => {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
};

// --- Auth API ---
export const signup = (data: {
  name: string;
  email: string;
  password: string;
  branch: string;
  year: string;
}): { success: boolean; error?: string; user?: User } => {
  const db = getUsersDB();

  if (db[data.email]) {
    return { success: false, error: "An account with this email already exists." };
  }

  const user: User = {
    id: `user_${Date.now()}`,
    name: data.name,
    email: data.email,
    branch: data.branch,
    year: data.year,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
    xp: 500,
    level: 1,
    archetype: "Rookie",
    joinedAt: new Date().toISOString(),
  };

  db[data.email] = { ...user, password: data.password };
  saveUsersDB(db);

  // Auto-login
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return { success: true, user };
};

export const login = (
  email: string,
  password: string
): { success: boolean; error?: string; user?: User } => {
  const db = getUsersDB();
  const record = db[email];

  if (!record) {
    return { success: false, error: "No account found with this email." };
  }

  if (record.password !== password) {
    return { success: false, error: "Incorrect password." };
  }

  const { password: _, ...user } = record;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return { success: true, user };
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};
