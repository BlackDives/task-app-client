import { Routes } from '@angular/router';
import { TaskPage } from './pages/TaskPage/task.component';
import { ChatPage } from './pages/ChatPage/chat.component';
import { MainComponent } from './main.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AuthGuard } from './misc/auth-guard';

export const routes: Routes = [
  { title: 'Login', path: 'login', component: LoginComponent },
  { title: 'Sign Up', path: 'register', component: SignupComponent },
  {
    title: 'Dashboard',
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { title: 'Tasks', path: 'tasks', component: TaskPage },
      { title: 'Chat', path: 'chat', component: ChatPage },
    ],
  },
];
