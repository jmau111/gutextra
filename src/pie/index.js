/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";

import {
    PanelBody,
    RangeControl,
    TextControl,
} from "@wordpress/components";


import { Fragment } from "@wordpress/element";

import { __ } from "@wordpress/i18n";

import "./style.scss";

registerBlockType("gutextra/charts", {
    title: __("Pie", "gutextra"),
    icon: "chart-pie",
    category: "common",
    keywords: [
        __("Charts", "gutextra"),
        __("Stats", "gutextra"),
        __("Pie", "gutextra"),
    ],
    attributes: {
        color: {
            type: "string",
            default: "#bf154a"
        },
        bgcolor: {
            type: "string",
            default: "#eee"
        },
        title: {
            type: "string",
            default: " "
        },
        percent: {
            type: "integer",
            default: 73,
        },
        size: {
            type: "integer",
            default: 200,
        }
    },

    edit({ attributes, setAttributes, className }) {
        const { size, color, bgcolor, title, percent } = attributes;

        const updateTitle = title => setAttributes({ title });
        const updatePercent = percent => setAttributes({ percent });
        const updateColor = color => setAttributes({ color });
        const updateBgColor = bgcolor => setAttributes({ bgcolor });
        const updateSize = size => setAttributes({ size });

        return (
            <Fragment>
                <div className={className}>
                    <div className="pie" style={{ width: size + 'px', height: size + 'px' }}>
                        <svg className="pie-svg" viewBox="0 0 32 32">
                            <title>{percent}%</title>
                            <circle style={{ stroke: color, strokeWidth: 32, fill: bgcolor }} r="16" cx="16" cy="16"
                                strokeDasharray={percent + " 100"}></circle>
                        </svg>
                    </div>
                    <p>{title}</p>
                </div>
                <InspectorControls>
                    <PanelBody title={__("Main settings", "gutextra")}>
                        <RangeControl
                            label={__("Percent", "gutextra")}
                            value={percent}
                            onChange={updatePercent}
                            min={0}
                            max={100}
                        />
                        <RangeControl
                            label={__("Size of charts", "gutextra")}
                            value={size}
                            onChange={updateSize}
                            min={32}
                            max={500}
                        />
                        <TextControl
                            label={__("Your title", "gutextra")}
                            value={title}
                            onChange={updateTitle}
                        />
                        <PanelColorSettings
                            colorSettings={[
                                {
                                    value: color,
                                    onChange: updateColor,
                                    label: __("Color for percent (stroke svg)", "gutextra"),
                                },
                            ]}>
                        </PanelColorSettings>
                        <PanelColorSettings colorSettings={[
                            {
                                value: bgcolor,
                                onChange: updateBgColor,
                                label: __("Color for background", "gutextra"),
                            },
                        ]}>
                        </PanelColorSettings>
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    },

    save({ attributes, className }) {
        const { size, color, bgcolor, title, percent } = attributes;

        return (
            <Fragment>
                <div className={className}>
                    <div className="pie" style={{ width: size + 'px', height: size + 'px' }}>
                        <svg className="pie-svg" viewBox="0 0 32 32">
                            <title>{percent}%</title>
                            <circle style={{ stroke: color, strokeWidth: 32, fill: bgcolor }} r="16" cx="16" cy="16"
                                stroke-dasharray={percent + " 100"}></circle>
                        </svg>
                    </div>
                    <p>{title}</p>
                </div>
            </Fragment>
        );
    }
});