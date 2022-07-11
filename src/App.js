import React from 'react';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import {
  SidePanel,
  DEFAULT_SECTIONS,
  ElementsSection,
} from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';

import { loadFile } from './file';
import { IllustrationsSection } from './illustrations-section';
import { FlaticonSection } from './flaticon-section';
import { VectorSection } from './svg-sidepanel';
import { QuotesSection } from './quotes-section';
import { IconFinderSection } from './iconfinder-section';
import { ElementsPanel } from './elements-panel';

import Topbar from './topbar';

ElementsSection.Panel = ElementsPanel;
// hide it for now
// DEFAULT_SECTIONS.splice(3, 0, IllustrationsSection);
// DEFAULT_SECTIONS.splice(3, 0, FlaticonSection);
// DEFAULT_SECTIONS.splice(3, 0, VectorSection);
DEFAULT_SECTIONS.splice(3, 1, ElementsSection);
DEFAULT_SECTIONS.splice(3, 1, QuotesSection);
DEFAULT_SECTIONS.splice(3, 0, IconFinderSection);

const useHeight = () => {
  const [height, setHeight] = React.useState(window.innerHeight);
  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight);
    });
  }, []);
  return height;
};

const App = ({ store }) => {
  const handleDrop = (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    // skip the case if we dropped DOM element from side panel
    // in that case Safari will have more data in "items"
    if (ev.dataTransfer.files.length !== ev.dataTransfer.items.length) {
      return;
    }
    // Use DataTransfer interface to access the file(s)
    for (let i = 0; i < ev.dataTransfer.files.length; i++) {
      loadFile(ev.dataTransfer.files[i], store);
    }
  };

  const height = useHeight();

  return (
    <div
      style={{
        width: '100vw',
        height: height + 'px',
        display: 'flex',
        flexDirection: 'column',
      }}
      onDrop={handleDrop}
    >
      <Topbar store={store} />
      <div style={{ height: 'calc(100% - 50px)' }}>
        <PolotnoContainer className="polotno-app-container">
          <SidePanelWrap>
            <SidePanel store={store} sections={DEFAULT_SECTIONS} />
          </SidePanelWrap>
          <WorkspaceWrap>
            <Toolbar store={store} />
            <Workspace store={store} />
            <ZoomButtons store={store} />
          </WorkspaceWrap>
        </PolotnoContainer>
      </div>
    </div>
  );
};

export default App;
