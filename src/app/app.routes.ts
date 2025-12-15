import { Routes } from '@angular/router';

export const routes: Routes = [
    // {
    //     path: '',
    //     loadComponent: () =>
    //         import('./components/layout/layout')
    //             .then(module => module.Layout)
    // },
    {
        path: '',
        loadComponent: () =>
            import('./components/register/register')
                .then(module => module.Register)
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./components/login/login')
                .then(module => module.Login)
    }
];
