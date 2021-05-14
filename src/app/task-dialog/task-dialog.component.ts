/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-dialog',
  template: `
    <mat-form-field>
      <mat-label>Title</mat-label>
      <input matInput cdkFocusInitial [(ngModel)]="data.task.title" />
    </mat-form-field>

    <mat-form-field>
      <mat-label>Description</mat-label>
      <textarea matInput [(ngModel)]="data.task.description"></textarea>
    </mat-form-field>

    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="{ task: data.task }">OK</button>
      <button mat-button (click)="cancel()">Cancel</button>
      <button
        *ngIf="data.enableDelete"
        mat-fab
        color="primary"
        aria-label="Delete"
        [mat-dialog-close]="{ task: data.task, delete: true }"
      >
        <mat-icon>delete</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent {
  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  cancel(): void {
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.dialogRef.close(this.data);
  }
}

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}
