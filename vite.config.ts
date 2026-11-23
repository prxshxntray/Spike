import {defineConfig} from 'vite';
export default defineConfig({build:{rolldownOptions:{onwarn(warning,defaultHandler){if(warning.code!=='MODULE_LEVEL_DIRECTIVE')defaultHandler(warning);},output:{codeSplitting:{groups:[{name:'math',test:/node_modules\/katex/},{name:'motion',test:/node_modules\/(motion|framer-motion)/}]}}}}});
