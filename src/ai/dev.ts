import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-mcq-and-provide-explanation.ts';
import '@/ai/flows/display-error-explanation-solution-tip.ts';
import '@/ai/flows/analyze-code-and-provide-explanation.ts';
import '@/ai/flows/analyze-text-and-provide-explanation.ts';
