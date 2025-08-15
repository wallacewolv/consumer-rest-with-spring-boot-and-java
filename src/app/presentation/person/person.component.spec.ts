import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PersonDTO } from '@domain/person/dto/person.dto';
import { PersonGatewayInterface } from '@infra/interfaces/person/person-gateway.interface';
import { of } from 'rxjs';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let fixture: ComponentFixture<PersonComponent>;
  let component: PersonComponent;
  let mockGateway: jasmine.SpyObj<PersonGatewayInterface>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const personsMock: PersonDTO[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Street',
      gender: 'Male',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      address: '456 Avenue',
      gender: 'Female',
    },
  ];

  beforeEach(async () => {
    mockGateway = jasmine.createSpyObj<PersonGatewayInterface>(
      'PersonGatewayInterface',
      ['listPersons', 'createPerson', 'updatePerson', 'deletePerson'],
    );

    mockDialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [PersonComponent, NoopAnimationsModule],
      providers: [
        { provide: PersonGatewayInterface, useValue: mockGateway },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load persons on init', () => {
    mockGateway.listPersons.and.returnValue(of(personsMock));

    fixture.detectChanges(); // triggers ngOnInit

    expect(mockGateway.listPersons).toHaveBeenCalled();
    expect(component.persons()).toEqual(personsMock);
  });

  it('openCreate should open dialog and create person if data returned', () => {
    const newPerson: PersonDTO = {
      id: 3,
      firstName: 'Alice',
      lastName: 'Brown',
      address: '789 Road',
      gender: 'Female',
    };
    mockDialog.open.and.returnValue({
      afterClosed: () => of(newPerson),
    } as any);
    mockGateway.createPerson.and.returnValue(of({ ...newPerson, id: 3 }));
    mockGateway.listPersons.and.returnValue(of(personsMock));

    component.openCreate();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockGateway.createPerson).toHaveBeenCalledWith(newPerson);
    expect(mockGateway.listPersons).toHaveBeenCalled();
  });

  it('openEdit should open dialog and update person if data returned', () => {
    const updatedPerson = { ...personsMock[0], firstName: 'Updated' };
    mockDialog.open.and.returnValue({
      afterClosed: () => of(updatedPerson),
    } as any);
    mockGateway.updatePerson.and.returnValue(of(updatedPerson));
    mockGateway.listPersons.and.returnValue(of(personsMock));

    component.openEdit(personsMock[0]);

    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockGateway.updatePerson).toHaveBeenCalledWith(
      personsMock[0].id.toString(),
      updatedPerson,
    );
    expect(mockGateway.listPersons).toHaveBeenCalled();
  });

  it('confirmDelete should open dialog and delete person if confirmed', () => {
    mockDialog.open.and.returnValue({ afterClosed: () => of(true) } as any);
    // eslint-disable-next-line no-void
    mockGateway.deletePerson.and.returnValue(of(void 0));
    mockGateway.listPersons.and.returnValue(of(personsMock));

    component.confirmDelete(personsMock[0]);

    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockGateway.deletePerson).toHaveBeenCalledWith(
      personsMock[0].id.toString(),
    );
    expect(mockGateway.listPersons).toHaveBeenCalled();
  });

  it('openCreate should not call createPerson if dialog returns null', () => {
    mockDialog.open.and.returnValue({ afterClosed: () => of(null) } as any);

    component.openCreate();

    expect(mockGateway.createPerson).not.toHaveBeenCalled();
  });

  it('openEdit should not call updatePerson if dialog returns null', () => {
    mockDialog.open.and.returnValue({ afterClosed: () => of(null) } as any);

    component.openEdit(personsMock[0]);

    expect(mockGateway.updatePerson).not.toHaveBeenCalled();
  });

  it('confirmDelete should not call deletePerson if not confirmed', () => {
    mockDialog.open.and.returnValue({ afterClosed: () => of(false) } as any);

    component.confirmDelete(personsMock[0]);

    expect(mockGateway.deletePerson).not.toHaveBeenCalled();
  });
});
