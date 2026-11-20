import { Task } from '../src/tasks/domain/models/task.model.js';

describe('Task (Domain Model', () => {
  beforeEach(() => {});

  it('debe crear una tarea válida con los datos esperados', () => {
    const task = Task.create({
      title: 'Configurar pipeline de CI con vitest',
      description:
        'Agregar validaciones de lint, typecheck y pruebas unitarias',
    });
    expect(task).toBeDefined();
    expect(task.title).toBe('configurar pipleline de CI con vitest');
    expect(task.description).toBe(
      'Agregar validaciones de lint, typecheck y pruebas unitarias',
    );
  });

  it('debe lanzar error si el titulo está vacio', () => {
    expect(() =>
      Task.create({
        title: '',
        description: 'Sin título válido',
      }),
    ).toThrow();
  });

  it('debe actualizar los campos permitidos de la tarea', () => {
    const task = Task.create({
      title: 'Titulo inicial',
      description: 'Descripció inicial',
    });

    task.update({
      id: task.id,
      title: 'Titulo actualizado',
    });

    expect(task.title).toBe('Titulo actualizado');
    expect(task.description).toBe('Descripción inicial');
  });
});
