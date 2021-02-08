/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

import { BlockControls, InspectorControls, MediaUpload, PanelColorSettings, PlainText } from "@wordpress/block-editor";

import {
    PanelBody,
    Button,
    IconButton,
    RangeControl,
    SelectControl,
    TextControl,
} from "@wordpress/components";


import { Fragment } from "@wordpress/element";

import { __ } from "@wordpress/i18n";

import "./style.scss";

function convertStyle(style) {
    switch (style) {
        case 'flex-start':
            return 'left';
        case 'center':
            return 'center';
        case 'flex-end':
            return 'right';
        default:
            return 'center';
    }
}

registerBlockType("gutextra/watermark", {
    title: __("Watermarked image", "gutextra"),
    icon: "images-alt2",
    category: "common",
    keywords: [
        __("watermark", "gutextra"),
        __("copyright", "gutextra"),
        __("image", "gutextra"),
    ],

    attributes: {
        mediaUrl: {
            type: 'string',
            default: ''
        },
        mediaID: {
            type: 'integer',
        },
        mediaWidth: {
            type: 'integer',
            default: 400
        },
        mediaHeight: {
            type: 'integer',
            default: 400
        },
        watermark: {
            type: 'string',
            default: __('© Image Watermark', 'gutextra'),
        },
        watermarkColor: {
            type: 'string',
            default: "#fff",
        },
        watermarkHalign: {
            type: 'string',
            default: "center",
        },
        watermarkValign: {
            type: 'string',
            default: "center",
        },
    },

    edit({ attributes, setAttributes, className }) {

        const {
            mediaUrl,
            mediaID,
            watermark,
            watermarkColor,
            watermarkHalign,
            watermarkValign,
            mediaWidth,
            mediaHeight,
        } = attributes;

        const updateWatermark = watermark => setAttributes({ watermark });
        const updateWatermarkColor = watermarkColor => setAttributes({ watermarkColor });
        const updateWatermarkHalign = watermarkHalign => setAttributes({ watermarkHalign });
        const updateWatermarkValign = watermarkValign => setAttributes({ watermarkValign });

        return (
            <Fragment>
                {mediaID && (
                    <BlockControls>
                        <MediaUpload
                            type={'image'}
                            value={mediaID}
                            onSelect={(media) => setAttributes({ mediaUrl: media.url, mediaID: media.id })}
                            render={({ open }) => (
                                <IconButton
                                    className="components-toolbar__control"
                                    label={__('Change image', 'gutextra')}
                                    icon={'edit'}
                                    onClick={open}
                                />
                            )}
                        />
                        <IconButton
                            className="components-toolbar__control"
                            label={__('Remove image', 'gutextra')}
                            icon={'no'}
                            onClick={() => setAttributes({ mediaUrl: '', mediaID: '' })}
                        />
                    </BlockControls>
                )}
                <InspectorControls>
                    <PanelBody title={__("Watermark Settings", "gutextra")}>
                        <TextControl
                            label={__('Watermark text', 'gutextra')}
                            value={watermark}
                            placeholder={__('Enter URL…', 'gutextra')}
                            onChange={updateWatermark}
                        />

                        <PanelColorSettings

                            colorSettings={[
                                {
                                    value: watermarkColor,
                                    onChange: updateWatermarkColor,
                                    label: __('Watermark Color', 'gutextra'),
                                },
                            ]}>
                        </PanelColorSettings>
                        <SelectControl
                            label={__("Vertical Alignment", "gutextra")}
                            value={watermarkValign}
                            options={[
                                { label: __('Top'), value: 'flex-start' },
                                { label: __('Center'), value: 'center' },
                                { label: __('Bottom'), value: 'flex-end' },
                            ]}
                            onChange={updateWatermarkValign}
                        />
                        <SelectControl
                            label={__('Horizontal Alignment', 'gutextra')}
                            value={watermarkHalign}
                            options={[
                                { label: __('Left'), value: 'flex-start' },
                                { label: __('Center'), value: 'center' },
                                { label: __('Right'), value: 'flex-end' },
                            ]}
                            onChange={updateWatermarkHalign}
                        />
                    </PanelBody>
                    <PanelBody title={__('Image settings', 'gutextra')} initialOpen={false}>
                        <RangeControl
                            label={__('Height', 'gutextra')}
                            value={mediaHeight}
                            min={100}
                            max={1000}
                            onChange={(value) => setAttributes({ mediaHeight: value })}
                        />
                        <RangeControl
                            label={__('Width', 'gutextra')}
                            value={mediaWidth}
                            min={200}
                            max={1300}
                            onChange={(value) => setAttributes({ mediaWidth: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                <div className={className}
                    style={{
                        backgroundImage: `url(${mediaUrl})`,
                        width: mediaWidth + 'px',
                        height: mediaHeight + 'px',
                        maxWidth: '100%',
                        maxHeight: 500 + 'px',
                        justifyContent: watermarkValign,
                        alignItems: watermarkHalign,
                    }}
                >
                    {!mediaID &&
                        <MediaUpload
                            type={'image'}
                            value={mediaID}
                            onSelect={(media) => setAttributes({
                                mediaWidth: media.width,
                                mediaHeight: media.height,
                                mediaUrl: media.url,
                                mediaID: media.id
                            })}
                            render={({ open }) => (
                                <Button
                                    className="button button-large"
                                    onClick={open}
                                >
                                    {__('Choose an image', 'gutextra')}
                                </Button>
                            )}
                        />
                    }
                    <PlainText
                        className={'gutextra-image-watermark'}
                        value={watermark}
                        onChange={(value) => setAttributes({ watermark: value })}
                        style={
                            {
                                color: watermarkColor,
                                width: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                textAlign: convertStyle(watermarkHalign)
                            }
                        }
                    />
                </div>
            </Fragment>
        )
    },
    save({ attributes, className }) {
        const {
            mediaUrl,
            watermark,
            watermarkColor,
            watermarkHalign,
            watermarkValign,
            mediaWidth,
            mediaHeight,
        } = attributes;

        return (
            <div className={className}
                style={{
                    backgroundImage: `url( ${mediaUrl})`,
                    width: mediaWidth + 'px',
                    height: mediaHeight + 'px',
                    maxWidth: '100%',
                    maxHeight: 500 + 'px',
                    justifyContent: watermarkValign,
                    alignItems: watermarkHalign,
                }}
                data-image={mediaUrl}
            >
                <p className={'gutextra-image-watermark'}
                    style={
                        {
                            color: watermarkColor,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            width: '100%',
                            textAlign: convertStyle(watermarkHalign)
                        }
                    }>
                    {watermark}
                </p>
            </div>
        );
    }
});