import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './presentation/layouts/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
    {
      path: '',
      component: DashboardLayoutComponent,
      children: [
        {
          path: 'orthography',
          loadComponent: () =>
            import(
              './presentation/pages/orthography-page/orthography-page.component'
            ),
          data: {
            icon: 'fa-solid fa-spell-check',
            title: 'Ortografía',
            description: 'Corregir ortografía',
          },
        },
        {
          path: 'pros-cons',
          loadComponent: () =>
            import('./presentation/pages/pros-cons-page/pros-cons-page.component'),
          data: {
            icon: 'fa-solid fa-code-compare',
            title: 'Pros & Cons',
            description: 'Comparar pros y contras',
          },
        },
        {
          path: 'pros-cons-stream',
          loadComponent: () =>
            import(
              './presentation/pages/pros-cons-stream-page/pros-cons-stream-page.component'
            ),
          data: {
            icon: 'fa-solid fa-water',
            title: 'Como stream',
            description: 'Con stream de mensajes',
          },
        },
        {
          path: 'translate',
          loadComponent: () =>
            import('./presentation/pages/translate-page/translate-page.component'),
          data: {
            icon: 'fa-solid fa-language',
            title: 'Traducir',
            description: 'Textos a otros idiomas',
          },
        },
        {
          path: 'text-to-audio',
          loadComponent: () =>
            import(
              './presentation/pages/text-to-audio-page/text-to-audio-page.component'
            ),
          data: {
            icon: 'fa-solid fa-podcast',
            title: 'Texto a audio',
            description: 'Convertir texto a audio',
          },
        },
        {
          path: 'audio-to-text',
          loadComponent: () =>
            import(
              './presentation/pages/audio-to-text-page/audio-to-text-page.component'
            ),
          data: {
            icon: 'fa-solid fa-comment-dots',
            title: 'Audio a texto',
            description: 'Convertir audio a texto',
          },
        },
        {
          path: 'image-generation',
          loadComponent: () =>
            import(
              './presentation/pages/image-generation-page/image-generation-page.component'
            ),
          data: {
            icon: 'fa-solid fa-image',
            title: 'Imágenes',
            description: 'Generar imágenes',
          },
        },
        {
          path: 'image-tunning',
          loadComponent: () =>
            import(
              './presentation/pages/image-tunning-page/image-tunning-page.component'
            ),
          data: {
            icon: 'fa-solid fa-wand-magic',
            title: 'Editar imagen',
            description: 'Generación continua',
          },
        },
  
        {
          path: 'assistant',
          loadComponent: () =>
            import('./presentation/pages/assistant-page/assistant-page.component'),
          data: {
            icon: 'fa-solid fa-user',
            title: 'Asistente',
            description: 'Información del asistente',
          },
        },
        {
          path: '**',
          redirectTo: 'orthography',
          pathMatch: 'full',
        },
      ],
    },
  ];
