export type Mods = Record<string, string | boolean>;
export type WithRequired<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
