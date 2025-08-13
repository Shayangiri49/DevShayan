import { randomUUID } from "crypto";

// This app is client-side only with local storage
// No backend storage needed for PyLearn

export interface IStorage {
  // Placeholder for future backend integration if needed
}

export class MemStorage implements IStorage {
  constructor() {
    // Client-side only app - no server storage needed
  }
}

export const storage = new MemStorage();
