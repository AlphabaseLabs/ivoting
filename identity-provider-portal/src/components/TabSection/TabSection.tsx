import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import React, { useEffect, useState } from 'react';
import { Button } from '~/components';
import {
  CloseButtonWrapper,
  Section,
  Tabs,
  TabHeader,
  TabChip,
  PaperTabBar,
} from './elements';

const createGetSectionProps = (name: string, activeSection: string) => () => ({
  style: { display: name === activeSection ? 'initial' : 'none' },
  key: name,
});

interface SectionProps {
  getSectionProps(): { style: { display: string }; key: string };
}
export interface Sections {
  name: string;
  displayName?: string;
  render(getSectionProps: SectionProps): React.ReactNode;
}

interface TabSectionProps {
  activeSection: string;
  sections: Sections[];
  goBack?(): void | null;
  onClickTab(name: string): (event: React.MouseEvent<HTMLDivElement>) => void;
  tabHeading?: string;
  containerStyles?: React.CSSProperties;
  sectionStyles?: React.CSSProperties;
}

export const TabSection: React.FC<TabSectionProps> = ({
  sections,
  onClickTab,
  activeSection,
  goBack = null,
  tabHeading,
  containerStyles = {},
  sectionStyles = {},
}) => {
  const [value, setValue] = useState(0);
  const tabIndex = sections.findIndex(
    (section) => section.name === activeSection
  );

  useEffect(() => {
    setValue(tabIndex || 0);
  }, [tabIndex]);
  function handleChange(_event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  const renderTabBar = () => {
    return (
      <Container maxWidth="lg">
        <Tabs
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
        >
          {sections.map(({ displayName, name }) =>
            renderTabChip({
              key: name,
              label: displayName || name,
              dataTestId: `${name[0] && name[0].toLowerCase()}${name.slice(1)}`,
              name,
            })
          )}
        </Tabs>
      </Container>
    );
  };

  const renderTabChip = (tabHeaderProps: {
    key: string;
    label: string;
    dataTestId: string;
    name: string;
  }) => (
    <Box mt={1} paddingLeft={2}>
      <TabChip
        active={activeSection === tabHeaderProps.name}
        key={tabHeaderProps.key}
        onClick={onClickTab(tabHeaderProps.name)}
        label={tabHeaderProps.label}
        data-testid={tabHeaderProps.dataTestId}
        variant={'outlined'}
      />
    </Box>
  );

  return (
    <Box>
      <Section wide={!!goBack} style={sectionStyles}>
        {!!goBack && (
          <CloseButtonWrapper style={{ float: 'right' }}>
            <Button kind="dark-blue" onClick={goBack}>
              Go Back
            </Button>
          </CloseButtonWrapper>
        )}
        {!!goBack ? (
          renderTabBar()
        ) : (
          <PaperTabBar elevation={3}>{renderTabBar()}</PaperTabBar>
        )}
      </Section>
      <Container style={containerStyles}>
        {tabHeading && (
          <Box width="100%" textAlign="center" paddingTop={10}>
            <TabHeader>{tabHeading} </TabHeader>
          </Box>
        )}
        {sections.map(({ name, render }) =>
          render({
            getSectionProps: createGetSectionProps(name, activeSection),
          })
        )}
      </Container>
    </Box>
  );
};
