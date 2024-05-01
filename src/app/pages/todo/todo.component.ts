import { Component, Input } from '@angular/core';
import { ITodo } from '../../core/models/todo.model';
import { ITodoStatus, TodoCardComponent } from '../../shared/components/todo-card/todo-card.component';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../core/services/todo.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoCardComponent, SlidePanelComponent, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  filterByStatus = '';
  todos: ITodo[] = [];
  todoForm!: FormGroup;
  todoID: number | null = null;
  todoStatus = ITodoStatus;
  isSlidePanelOpen = false;
  @Input() headerText = "Slide Panel";

  constructor(private todoService: TodoService, private fb: FormBuilder){
    this.todoForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('OPEN', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos(){
    this.todoService.getAllTodos(this.filterByStatus).subscribe({
      next: (response) => {
        this.todos = response;
      }
    })
  }


  onFilterByStatus(status: string){
    this.filterByStatus = status;
    this.getAllTodos();
  }

  onLoadTodoForm(item: ITodo){
    this.todoID = item.id!!;
    this.todoForm.patchValue({
      title: item.title,
      description: item.description,
      status: item.status
    })
    this.openSlidePanel();
  }

  onCloseSlidePanel(){
    this.isSlidePanelOpen = false;
  }

  openSlidePanel(){
    this.isSlidePanelOpen = true;
  }

  onSubmit(){
    if(this.todoForm.valid){
      if(this.todoID){
        this.todoService.updateTodo(this.todoID, this.todoForm.value).subscribe({
          next: (res) => {
            this.getAllTodos();
            this.onCloseSlidePanel();
          }
        })
      }else{
        this.todoService.addTodo(this.todoForm.value).subscribe({
          next: (res) => {
            this.getAllTodos();
            this.onCloseSlidePanel();
          }
        })
      }
    }else{
      this.todoForm.markAllAsTouched;
    }
  }

}
