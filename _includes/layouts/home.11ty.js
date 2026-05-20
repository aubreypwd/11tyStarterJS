import { readFileSync } from 'node:fs';

const messageBoxCss = readFileSync( new URL( '../../css/message-box.css', import.meta.url ), 'utf8' );

export default class Home {
	data() {
		return {
			layout: 'layouts/base.11ty.js',
		};
	}

	render( data ) {
		return /* html */ `
			<style>${ messageBoxCss }</style>

			<!-- Delete this block, which will also remove the component CSS from the bundle -->
			<div class="message-box">
				<ol>
					<li>Edit <code>_data/metadata.js</code> with your blog’s information.</li>
					<li>(Optional) Edit <code>eleventy.config.js</code> with your <a href="https://www.11ty.dev/docs/config/">configuration preferences</a>.</li>
					<li>Delete this message from <code>_includes/layouts/home.11ty.js</code>.</li>
				</ol>
				<p><em>This is an <a href="https://www.11ty.dev/">Eleventy project</a> created from the <a href="https://github.com/11ty/11tyStarterJS"><code>11tyStarterJS</code> repo</a>.</em></p>
			</div>
			<!-- Stop deleting -->

			${ data.content }
		`;
	}
}
