import {
  AfterContentInit,
  Component,
  contentChildren,
  effect,
  input,
  model,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { VerticalTabComponent } from '../vertical-tab/vertical-tab.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';

export interface KpsTab {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  isSecondary: boolean;
}

@Component({
  selector: 'kps-vertical-tabs-container',
  imports: [MatIcon, NgTemplateOutlet, NgClass],
  templateUrl: './vertical-tabs-container.component.html',
  styleUrl: './vertical-tabs-container.component.scss',
})
export class VerticalTabsContainerComponent
  implements AfterContentInit, OnDestroy
{
  constructor() {
    effect(() => {
      // sortTabs whenever tabs change
      if (this.tabs()) {
        this.sortTabs();
      }
    });
  }
  activeTabId = model<string>('');
  tabSelected = output<string>();

  sectionTitle = input<string | undefined>(undefined);
  secondarySectionTitle = input<string | undefined>(undefined);

  tabs = contentChildren<VerticalTabComponent>(VerticalTabComponent);

  primaryTabs = signal<VerticalTabComponent[]>([]);
  secondaryTabs = signal<VerticalTabComponent[]>([]);

  ngAfterContentInit() {
    this.sortTabs();

    // If no active tab, select the first one
    if (!this.activeTabId && this.primaryTabs.length > 0) {
      this.selectTab(this.primaryTabs()[0].id());
    }
  }

  sortTabs() {
    this.primaryTabs.set(this.tabs().filter((tab) => !tab.isSecondary())); // primary
    this.secondaryTabs.set(this.tabs().filter((tab) => tab.isSecondary())); // secondary
  }

  selectTab(tabId: string): void {
    this.activeTabId.set(tabId);
    this.tabSelected.emit(tabId);

    // Mark the selected tab as active and others as inactive
    this.tabs().forEach((tab) => {
      tab.isActive = tab.id() === tabId;
    });
  }

  isTabActive(tabId: string): boolean {
    return this.activeTabId() === tabId;
  }

  ngOnDestroy(): void {
    // Reset all tab states
    this.activeTabId.set('');
    this.primaryTabs.set([]);
    this.secondaryTabs.set([]);
    this.tabs().forEach((tab) => {
      tab.isActive = false;
    });
  }
}
