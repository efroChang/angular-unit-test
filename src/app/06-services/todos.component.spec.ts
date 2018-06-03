import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

describe('TodosComponent', () => {

  let component: TodosComponent;

  let todoService: TodoService;

  beforeEach(() => 
  {
    todoService = new TodoService( null );                  // Cheat and pass in null for Http
    component = new TodosComponent( todoService );
  });

  it('should set the todos property when the items returned from the HTTP server', () => {

    // Arrange
    let todosStub = [ 1, 2, 3 ];                            // The fake result array
    spyOn( todoService, 'getTodos').and.callFake( () => {   // [KEY]: Use "spyOn()" to mock the Service method call

      return Observable.from( [ todosStub ] );              // [KEY]: Fake returning Observable with an array
    });

    // Act
    component.ngOnInit();

    // Assert
    expect( component.todos ).toBe( todosStub );

  });
});