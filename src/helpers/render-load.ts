import { svg } from 'lit';
import { Utils } from './utils';
import { DataDto } from '../types';

export const renderLoad = (
	loadId: string,
	iconId: string,
	icon: string,
	iconSize: number,
	baseX: number,
	baseY: number,
	navigate: string,
	gridPercentage: number,
	batteryPercentage: number,
	dynamic_colour: boolean,
	loadColour: string,
	data: DataDto,
) => {
	const { solarColour, batteryColour, gridColour } = data;

	const x = iconSize === 1 ? baseX : baseX - 3;
	const y = iconSize === 1 ? baseY : baseY - 8.5;
	const wh = iconSize === 1 ? 75 : 79;

	return svg`
            <a
                href="#"
                @click=${
									navigate ? (e) => Utils.handleNavigation(e, navigate) : null
								}
            >
                <svg
                    id="${loadId}"
                    x="${x}"
                    y="${y}"
                    width="${wh}"
                    height="${wh}"
                    viewBox="0 0 24 24"
                >
                    <rect width="24" height="24" fill="transparent" />
                    <defs>
                        <linearGradient
                            id="${iconId}"
                            x1="0%"
                            x2="0%"
                            y1="100%"
                            y2="0%"
                        >
                            <stop
                                offset="0%"
                                stop-color="${
																	gridPercentage > 0
																		? gridColour
																		: batteryPercentage > 0
																			? batteryColour
																			: solarColour
																}"
                            />
                            <stop
                                offset="${gridPercentage}%"
                                stop-color="${
																	gridPercentage > 0
																		? gridColour
																		: batteryPercentage > 0
																			? batteryColour
																			: solarColour
																}"
                            />
                            <stop
                                offset="${gridPercentage}%"
                                stop-color="${
																	batteryPercentage > 0
																		? batteryColour
																		: solarColour
																}"
                            />
                            <stop
                                offset="${gridPercentage + batteryPercentage}%"
                                stop-color="${
																	batteryPercentage > 0
																		? batteryColour
																		: solarColour
																}"
                            />
                            <stop
                                offset="${gridPercentage + batteryPercentage}%"
                                stop-color="${solarColour}"
                            />
                            <stop offset="100%" stop-color="${solarColour}" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="${dynamic_colour ? `url(#Lg-esscompact)` : loadColour}"
                        d="${icon}"
                    />
                </svg>
            </a>`;
};
