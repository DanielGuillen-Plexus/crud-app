import { Routes } from '@angular/router';
import { CrudList } from './crud-list/crud-list';
import { CrudCreate } from './crud-create/crud-create';
import { CrudUpdate } from './crud-update/crud-update';
export const routes: Routes = [
    {
        path: '',
        component: CrudList,
        title: 'Homepage'
    },
    {
        path:'create',
        component: CrudCreate,
        title:'Create user'
    },
    {
        path: 'update/:id',
        component:CrudUpdate,
        title: 'Update user'
    }
];
