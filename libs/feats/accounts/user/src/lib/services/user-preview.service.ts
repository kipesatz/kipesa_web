// user-preview.service.ts
import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
} from '@angular/core';
import { UserPreviewComponent } from '../components/user-preview/user-preview.component';
import { User } from '@kps/data/accounts';

export interface UserPreviewConfig {
  user: User;
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserPreviewService {
  private previewRef: any = null;
  private closeTimeout: any = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  showUserPreview(config: UserPreviewConfig): void {
    // Clear any existing preview
    this.clearPreview();

    // Create component
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        UserPreviewComponent
      );
    const componentRef = componentFactory.create(this.injector);

    // Set input properties
    componentRef.instance.user.set(config.user);

    // Attach component to the appRef
    this.appRef.attachView(componentRef.hostView);

    // Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // Append to body
    document.body.appendChild(domElem);

    // Set position
    domElem.style.position = 'absolute';
    domElem.style.left = `${config.x}px`;
    domElem.style.top = `${config.y}px`;
    domElem.style.zIndex = '1000';

    // Store reference
    this.previewRef = {
      componentRef,
      element: domElem,
    };

    // Add mouse enter/leave listeners
    domElem.addEventListener('mouseenter', this.onPreviewMouseEnter.bind(this));
    domElem.addEventListener('mouseleave', this.onPreviewMouseLeave.bind(this));
  }

  private onPreviewMouseEnter(): void {
    // Clear timeout if mouse enters the preview
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  private onPreviewMouseLeave(): void {
    // Set timeout to close preview when mouse leaves
    this.closeTimeout = setTimeout(() => {
      this.clearPreview();
    }, 100); // Close after 500ms of mouse leaving
  }

  hideUserPreview(): void {
    this.clearPreview();
  }

  private clearPreview(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }

    if (this.previewRef) {
      // Detach from appRef
      this.appRef.detachView(this.previewRef.componentRef.hostView);

      // Destroy component
      this.previewRef.componentRef.destroy();

      // Remove from DOM
      if (this.previewRef.element.parentNode) {
        this.previewRef.element.parentNode.removeChild(this.previewRef.element);
      }

      this.previewRef = null;
    }
  }
}
