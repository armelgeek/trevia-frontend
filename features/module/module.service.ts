// Données fictives en mémoire
export type Module = {
  id: string;
  name: string;
  description: string;
};

const mockModules: Module[] = [
  { id: 'module-1', name: 'Module 1', description: 'Description du module 1' },
  { id: 'module-2', name: 'Module 2', description: 'Description du module 2' },
];

export class ModuleService {
  static list() {
    return Promise.resolve({ data: mockModules });
  }
  static get(id: string) {
    return Promise.resolve({ data: mockModules.find(m => m.id === id) });
  }
  static create(data: Omit<Module, 'id'>) {
    const newModule: Module = { ...data, id: `module-${Math.random().toString(36).slice(2, 8)}` };
    mockModules.push(newModule);
    return Promise.resolve(newModule);
  }
  static update(id: string, data: Partial<Module>) {
    const idx = mockModules.findIndex(m => m.id === id);
    if (idx !== -1) {
      mockModules[idx] = { ...mockModules[idx], ...data };
      return Promise.resolve(mockModules[idx]);
    }
    return Promise.reject(new Error('Not found'));
  }
  static delete(id: string) {
    const idx = mockModules.findIndex(m => m.id === id);
    if (idx !== -1) {
      mockModules.splice(idx, 1);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Not found'));
  }
}
