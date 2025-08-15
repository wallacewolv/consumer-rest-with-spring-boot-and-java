// src/app/features/person/person.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';
import { CustomDialogComponent } from '@core/components/custom-dialog/custom-dialog.component';
import { PersonDTO } from '@domain/person/dto/person.dto';
import { PersonGatewayInterface } from '@infra/interfaces/person/person-gateway.interface';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
})
export class PersonComponent implements OnInit {
  private gateway = inject(PersonGatewayInterface);
  private dialog = inject(MatDialog);

  persons = signal<PersonDTO[]>([]);
  displayedColumns = ['firstName', 'lastName', 'address', 'gender', 'actions'];

  ngOnInit() {
    this.loadPersons();
  }

  loadPersons() {
    this.gateway.listPersons().subscribe((data) => this.persons.set(data));
  }

  openCreate() {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '500px',
      data: {
        title: 'Add Person',
        fields: [
          { key: 'firstName', label: 'First Name', type: 'text' },
          { key: 'lastName', label: 'Last Name', type: 'text' },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'gender', label: 'Gender', type: 'text' },
        ],
        values: {},
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gateway.createPerson(result).subscribe(() => this.loadPersons());
      }
    });
  }

  openEdit(person: PersonDTO) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '500px',
      data: {
        title: 'Edit Person',
        fields: [
          { key: 'firstName', label: 'First Name', type: 'text' },
          { key: 'lastName', label: 'Last Name', type: 'text' },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'gender', label: 'Gender', type: 'text' },
        ],
        values: { ...person },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gateway
          .updatePerson(person.id.toString(), result)
          .subscribe(() => this.loadPersons());
      }
    });
  }

  confirmDelete(person: PersonDTO) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: `Delete ${person.firstName} ${person.lastName}?`,
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.gateway
          .deletePerson(person.id.toString())
          .subscribe(() => this.loadPersons());
      }
    });
  }
}
