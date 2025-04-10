import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { MainLayout, Button, Table } from '~/components';
import { useHistory } from 'react-router-dom';

export const UsersPage: React.FC<{}> = () => {
  const history = useHistory();
  return (
    <MainLayout headerProps={{ heading: 'Nano Users' }} showFooter={false}>
      <Container maxWidth="lg" style={{ padding: '20px' }}>
        <Table
          tableContent={{
            headers: [
              <Typography>address</Typography>,
              <Typography>Balance (NANO)</Typography>,
              <Typography>Action</Typography>,
            ],
            rows: [
              {
                data: [
                  <div>0xx4838534587389</div>,
                  <div>450</div>,
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push('/users/user');
                    }}
                  >
                    Details
                  </Button>,
                ],
                goTo: '/certificate',
              },
              {
                data: [
                  <div>0xx4838534587389</div>,
                  <div>450</div>,
                  <Button>Details</Button>,
                ],
                goTo: '/certificate',
              },
              {
                data: [
                  <div>0xx4838534587389</div>,
                  <div>450</div>,
                  <Button>Details</Button>,
                ],
                goTo: '/certificate',
              },
              {
                data: [
                  <div>0xx4838534587389</div>,
                  <div>450</div>,
                  <Button>Details</Button>,
                ],
                goTo: '/certificate',
              },
              {
                data: [
                  <div>0xx4838534587389</div>,
                  <div>0.0009</div>,
                  <Button>Details</Button>,
                ],
                goTo: '/certificate',
              },
            ],
          }}
        />
      </Container>
    </MainLayout>
  );
};
