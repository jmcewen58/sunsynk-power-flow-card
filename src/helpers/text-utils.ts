import { svg } from 'lit';

export const createTextWithPopup = (
	id: string,
	x: number | string,
	y: number | string,
	displayCondition: boolean,
	className: string,
	fill: string,
	text: string,
	onClick: (e: Event) => void,
	hideOnCondition: boolean = false, // Default behavior: hide when condition is false
) => {
    const enhFill = globalThis.enhancedLabelColour==='' || fill==='transparent'
        ?fill
        : ['st3 ','st4 ', 'st10'].includes(className.substring(0,4)) && !(className==='st4 st8')
            ?globalThis.enhancedLabelColour
            :fill;
	return svg`
        <a href="#" @click=${onClick}>
            <text id="${id}" x="${x}" y="${y}" 
                display="${hideOnCondition ? (displayCondition ? 'none' : '') : displayCondition ? '' : 'none'}" 
                class="${className}" 
                fill="${enhFill}">
                ${text}
            </text>
        </a>
    `;
};

export const renderText = (
	id: string,
	x: number | string,
	y: number | string,
	displayCondition: boolean,
	className: string,
	fill: string,
	text: string,
	hideOnCondition: boolean = false, // Default behavior: hide when condition is false
) => {
    const enhFill = globalThis.enhancedLabelColour==='' || fill==='transparent'
        ?fill
        : ['st3 ','st4 ', 'st10'].includes(className.substring(0,4)) && !(className==='st4 st8')
            ?globalThis.enhancedLabelColour
            :fill;
	return svg`
        <text id="${id}" x="${x}" y="${y}" 
            display="${hideOnCondition ? (displayCondition ? 'none' : '') : displayCondition ? '' : 'none'}"
            class="${className}" 
            fill="${enhFill}">
            ${text}
        </text>
    `;
};
