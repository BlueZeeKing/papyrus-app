import './app.css';
import SetSkin from './pages/SetSkin.svelte';

const app = new SetSkin({
	target: document.getElementById('app') as HTMLElement
});

export default app;
