import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'locate',
        data: { pageTitle: 'macaviApp.locate.home.title' },
        loadChildren: () => import('./locate/locate.module').then(m => m.LocateModule),
      },
      {
        path: 'cliente',
        data: { pageTitle: 'macaviApp.cliente.home.title' },
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
      },
      {
        path: 'tipo-dni',
        data: { pageTitle: 'macaviApp.tipoDni.home.title' },
        loadChildren: () => import('./tipo-dni/tipo-dni.module').then(m => m.TipoDniModule),
      },
      {
        path: 'usuario',
        data: { pageTitle: 'macaviApp.usuario.home.title' },
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
      },
      {
        path: 'factura',
        data: { pageTitle: 'macaviApp.factura.home.title' },
        loadChildren: () => import('./factura/factura.module').then(m => m.FacturaModule),
      },
      {
        path: 'rol',
        data: { pageTitle: 'macaviApp.rol.home.title' },
        loadChildren: () => import('./rol/rol.module').then(m => m.RolModule),
      },
      {
        path: 'rol-usuario',
        data: { pageTitle: 'macaviApp.rolUsuario.home.title' },
        loadChildren: () => import('./rol-usuario/rol-usuario.module').then(m => m.RolUsuarioModule),
      },
      {
        path: 'producto',
        data: { pageTitle: 'macaviApp.producto.home.title' },
        loadChildren: () => import('./producto/producto.module').then(m => m.ProductoModule),
      },
      {
        path: 'producto-factura',
        data: { pageTitle: 'macaviApp.productoFactura.home.title' },
        loadChildren: () => import('./producto-factura/producto-factura.module').then(m => m.ProductoFacturaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
