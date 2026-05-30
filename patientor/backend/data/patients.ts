import type { Patient, Gender } from '../src/types.ts';

const patients: Patient[] = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: "male" as Gender,
    occupation: "New york city cop",
    entries: [
      {
        id: "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
        date: "2015-01-02",
        type: "Hospital",
        specialist: "MD House",
        diagnosisCodes: ["S62.5"],
        description: "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: "2015-01-16",
          criteria: "Thumb has healed."
        }
      }
    ]
  },
  {
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-777A",
    gender: "male" as Gender,
    occupation: "Cop",
    entries: [
      {
        id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
        date: "2019-08-05",
        type: "OccupationalHealthcare",
        specialist: "MD House",
        employerName: "HyPD",
        diagnosisCodes: ["Z57.1", "Z74.3", "M51.2"],
        description: "Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning.",
        sickLeave: {
          startDate: "2019-08-05",
          endDate: "2019-08-28"
        }
      }
    ]
  },
  {
    id: "d27736ec-f723-11e9-8f0b-362b9e155667",
    name: "Hans Gruber",
    dateOfBirth: "1970-04-25",
    ssn: "250470-555L",
    gender: "other" as Gender,
    occupation: "Technician",
    entries: []
  },
  {
    id: "d2773822-f723-11e9-8f0b-362b9e155667",
    name: "Dana Scully",
    dateOfBirth: "1974-01-05",
    ssn: "050174-432N",
    gender: "female" as Gender,
    occupation: "Forensic Pathologist",
    entries: [
      {
        id: "b4f4eca1-2aa7-4b9c-9ebe-3d4b6e8f2a1c",
        date: "2019-10-20",
        type: "HealthCheck",
        specialist: "MD House",
        description: "Yearly control visit. Cholesterol levels back to normal.",
        healthCheckRating: 0
      },
      {
        id: "c4d4e1b2-3aa8-4c9d-9fce-4e5b7f9a2b1d",
        date: "2019-09-10",
        type: "HealthCheck",
        specialist: "MD House",
        description: "Prescriptions renewed.",
        healthCheckRating: 1
      },
      {
        id: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        date: "2018-10-05",
        type: "HealthCheck",
        specialist: "MD House",
        description: "Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.",
        healthCheckRating: 2
      }
    ]
  },
  {
    id: "d2773c6e-f723-11e9-8f0b-362b9e155667",
    name: "Molly Millions",
    dateOfBirth: "1984-01-30",
    ssn: "300184-777A",
    gender: "female" as Gender,
    occupation: "Cyberpunk mercenary",
    entries: []
  }
];

export default patients;