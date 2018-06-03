import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

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

  // --------------------------------
  // Test TodosComponent.add()
  // --------------------------------

  // Case #1: Test if Service.add() is being called
  it( 'should call the sever to save the changes when the new todo item is added', () => 
  {
    let spy = spyOn( todoService, 'add' ).and.callFake( ( todo: any ) => {    // [KEY]: Assing Spy to a variable

      return Observable.empty();            // Return an empty object because we don't care about the result.
    });

    component.add();

    expect( spy ).toHaveBeenCalled();       // [KEY]: to see if the Spy is called
  });

  // Case #2: Test if an element is added to an array
  it( 'should add the new todo item from the server', () => 
  {
    let fakeTodo = { id: 1 };
    spyOn( todoService, 'add' ).and.returnValue( Observable.from( [ fakeTodo ] ) );   // [KEY]: Use and.returnValue() instead of callFake()

    component.add();

    expect( component.todos.indexOf( fakeTodo ) ).toBeGreaterThan( -1 );                 // [KEY]: To check if an array element exisits
  });

  // Case #3: Test if the error message is set to component property
  it( 'should set to message property if sever returns error when adding a new todo', () => 
  {
    let errorMessage = 'Error from the server';
    spyOn( todoService, 'add' ).and.returnValue( Observable.throw( errorMessage ) );   // [KEY]: Use Observable.throw() for errors form server

    component.add();

    expect( component.message ).toBe( errorMessage );                 
  });

});