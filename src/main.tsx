import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'katex/dist/katex.min.css';
import './styles.css';
class Boundary extends React.Component<{children:React.ReactNode},{error:boolean}>{state={error:false};static getDerivedStateFromError(){return {error:true};}render(){return this.state.error?<main className="loading"><h1>Something interrupted Spike.</h1><p>Your saved progress is still on this device. Reload to try again.</p><button className="primary" onClick={()=>location.reload()}>Reload app</button></main>:this.props.children;}}
createRoot(document.getElementById('root')!).render(<Boundary><App/></Boundary>);
