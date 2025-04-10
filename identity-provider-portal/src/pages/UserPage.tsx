import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TabSection, MainLayout, Table, FormLabel } from '~/components';

export const UserPage: React.FC<{}> = () => {
  const [activeSection, setActiveSection] = useState('details');
  const history = useHistory();
  const onClickTab = (tabName: string) => () => setActiveSection(tabName);

  return (
    <MainLayout headerProps={{ heading: 'User Details' }} showFooter={false}>
      <TabSection
        goBack={() => history.push('/users')}
        onClickTab={onClickTab}
        activeSection={activeSection}
        containerStyles={{ justifyContent: 'flex-start' }}
        sections={[
          {
            name: 'details',
            displayName: 'Details',
            render: ({ getSectionProps }) => (
              <div {...getSectionProps()} id="detail-section">
                <Container maxWidth="lg">
                  <Box
                    padding="40px 20px"
                    style={{ lineHeight: 2.5, letterSpacing: '2px' }}
                  >
                    <Box display="flex" alignItems="center">
                      <Typography>
                        <FormLabel> Address:</FormLabel>
                      </Typography>
                      <Typography>
                        <Box component="span" letterSpacing="0px">
                          {' '}
                          0xx4838534587389
                        </Box>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Typography>
                        <FormLabel> Balance:</FormLabel>
                      </Typography>
                      <Typography>
                        <Box component="span" letterSpacing="0px">
                          {' '}
                          450 NANO
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                </Container>
              </div>
            ),
          },
          {
            name: 'certificates',
            displayName: 'certificates on sale',
            render: ({ getSectionProps }) => (
              <div {...getSectionProps()} id="transanctions-section">
                <Table
                  tableContent={{
                    headers: [
                      <Typography>address</Typography>,
                      <Typography>Marketplace link</Typography>,
                    ],
                    rows: [
                      {
                        data: [
                          <div>0xx4838534587389</div>,
                          <div>https//djfdjjd</div>,
                        ],
                      },
                      {
                        data: [
                          <div>0xx4838534587389</div>,
                          <div>https//djfdjjd</div>,
                        ],
                      },
                      {
                        data: [
                          <div>0xx4838534587389</div>,
                          <div>https//djfdjjd</div>,
                        ],
                      },
                      {
                        data: [
                          <div>0xx4838534587389</div>,
                          <div>https//djfdjjd</div>,
                        ],
                      },
                      {
                        data: [
                          <div>0xx4838534587389</div>,
                          <div>https//djfdjjd</div>,
                        ],
                      },
                    ],
                  }}
                />
              </div>
            ),
          },
          {
            name: 'transacions',
            displayName: 'Transacions',
            render: ({ getSectionProps }) => (
              <div {...getSectionProps()} id="transanctions-section">
                <Table
                  tableContent={{
                    headers: [
                      <Typography>from</Typography>,
                      <Typography>type</Typography>,
                      <Typography>time</Typography>,
                      <Typography>to</Typography>,
                      <Typography>hash</Typography>,
                      <Typography>value(NANO)</Typography>,
                      <Typography>explore link</Typography>,
                    ],
                    rows: [
                      {
                        data: [
                          <div>0xx4838534587389</div>,
                          <div>certificate claimed</div>,
                          <div>12:00 EST</div>,
                          <div>0xx4838534587389</div>,
                          <div>0xx4838534587389</div>,
                          <div>450</div>,
                          <div>https//djfdjjd</div>,
                        ],
                      },
                      {
                        data: [
                          <div>0xx4838534587389</div>,
                          <div>certificate claimed</div>,
                          <div>12:00 EST</div>,
                          <div>0xx4838534587389</div>,
                          <div>0xx4838534587389</div>,
                          <div>450</div>,
                          <div>https//djfdjjd</div>,
                        ],
                      },
                      {
                        data: [
                          <div>0xx4838534587389</div>,
                          <div>certificate claimed</div>,
                          <div>12:00 EST</div>,
                          <div>0xx4838534587389</div>,
                          <div>0xx4838534587389</div>,
                          <div>450</div>,
                          <div>https//djfdjjd</div>,
                        ],
                      },
                      {
                        data: [
                          <div>0xx4838534587389</div>,
                          <div>certificate claimed</div>,
                          <div>12:00 EST</div>,
                          <div>0xx4838534587389</div>,
                          <div>0xx4838534587389</div>,
                          <div>450</div>,
                          <div>https//djfdjjd</div>,
                        ],
                      },
                      {
                        data: [
                          <div>0xx4838534587389</div>,
                          <div>certificate claimed</div>,
                          <div>12:00 EST</div>,
                          <div>0xx4838534587389</div>,
                          <div>0xx4838534587389</div>,
                          <div>450</div>,
                          <div>https//djfdjjd</div>,
                        ],
                      },
                    ],
                  }}
                />
              </div>
            ),
          },
        ]}
      />
    </MainLayout>
  );
};
