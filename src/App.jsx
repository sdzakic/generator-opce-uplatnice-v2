import React from 'react';
import { useSelector } from 'react-redux';
import { LoadDialog, SaveDialog, Forma, Validacija, ButtonBox } from './components';

function App() {
  const nalozi = useSelector(state => state.nalog.nalozi);

  return (
    <div>
      <LoadDialog />
      <SaveDialog />
      {nalozi.map(nalog => (
        <React.Fragment key={nalog.id}>
          <Forma nalogId={nalog.id} />
          <Validacija nalogId={nalog.id} />
        </React.Fragment>
      ))}
      <ButtonBox />
    </div>
  );
}

export default App;
