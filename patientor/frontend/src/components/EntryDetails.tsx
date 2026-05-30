import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Entry, Diagnosis } from '../types';

const HealthCheckIcon = ({ rating }: { rating: number }) => {
  const icons = ['❤️', '💛', '🧡', '🖤'];
  return <span>{icons[rating] || '❤️'}</span>;
};

const EntryDetails = ({ entry, diagnosesMap }: { entry: Entry; diagnosesMap: Map<string, Diagnosis> }) => {
  const getDiagnosisName = (code: string) => {
    const diag = diagnosesMap.get(code);
    return diag ? `${code} ${diag.name}` : code;
  };

  switch (entry.type) {
    case 'HealthCheck':
      return (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {entry.date} <HealthCheckIcon rating={entry.healthCheckRating} />
            </Typography>
            <Typography><em>{entry.description}</em></Typography>
            <Typography>specialist: {entry.specialist}</Typography>
            {entry.diagnosisCodes && (
              <List dense>
                {entry.diagnosisCodes.map(code => (
                  <ListItem key={code}>
                    <ListItemText primary={getDiagnosisName(code)} />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      );
    case 'Hospital':
      return (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{entry.date} 🏥</Typography>
            <Typography><em>{entry.description}</em></Typography>
            <Typography>specialist: {entry.specialist}</Typography>
            <Typography>discharge: {entry.discharge.date} – {entry.discharge.criteria}</Typography>
            {entry.diagnosisCodes && (
              <List dense>
                {entry.diagnosisCodes.map(code => (
                  <ListItem key={code}>
                    <ListItemText primary={getDiagnosisName(code)} />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      );
    case 'OccupationalHealthcare':
      return (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{entry.date} 💼 {entry.employerName}</Typography>
            <Typography><em>{entry.description}</em></Typography>
            <Typography>specialist: {entry.specialist}</Typography>
            {entry.sickLeave && (
              <Typography>sick leave: {entry.sickLeave.startDate} – {entry.sickLeave.endDate}</Typography>
            )}
            {entry.diagnosisCodes && (
              <List dense>
                {entry.diagnosisCodes.map(code => (
                  <ListItem key={code}>
                    <ListItemText primary={getDiagnosisName(code)} />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      );
    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never) => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

export default EntryDetails;