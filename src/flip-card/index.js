/**
 * NOTE: this block is entirely inspired by the super cool tutorial https://davidwalsh.name/css-flip by David Walsh
 * WordPress dependencies
 */
import { registerBlockType, AlignmentToolbar } from "@wordpress/blocks";

import { InspectorControls, MediaUpload, PanelColorSettings } from "@wordpress/block-editor";

import {
    PanelBody,
    Button,
    Placeholder,
    SelectControl,
    TextControl,
    TextareaControl,
} from "@wordpress/components";


import { Fragment } from "@wordpress/element";

import { __ } from "@wordpress/i18n";

import "./style.scss";

function applyStyles(cardImageUrl, cardContentBgColor, cardTitleColor, cardContentColor) {
    const divBgImageStyle = {
        backgroundImage: 'url(' + cardImageUrl + ')',
        backgroundSize: 'cover',
    };
    const divStyle = {
        backgroundColor: cardContentBgColor,
        color: cardContentColor
    };

    const titleStyle = {
        color: cardTitleColor
    };
    return { divBgImageStyle, divStyle, titleStyle };
}

registerBlockType("gutextra/flip-card", {
    title: __("Flip card", "gutextra"),
    icon: "media-interactive",
    category: "common",
    keywords: [
        __("flip", "gutextra"),
        __("cards", "gutextra"),
        __("cards", "gutextra"),
    ],
    attributes: {
        cardTitle: {
            type: "string",
            default: "Lorem ipsum..."
        },
        cardContent: {
            type: "string",
            default: "Lorem ipsum Lorem ipsum...",
        },
        cardImageID: {
            type: "integer",
        },
        cardImageDescription: {
            type: "string",
            default: "Lorem ipsum...",
        },
        cardImageUrl: {
            type: "string",
            default: "",
        },
        cardContentBgColor: {
            type: 'string',
            default: "#eee",
        },
        cardTitleColor: {
            type: 'string',
            default: "#00304a",
        },
        cardContentColor: {
            type: 'string',
            default: "#bf154a",
        },
        cardEffect: {
            'type': 'string',
            'default': 'horizontal'
        }
    },

    edit({ attributes, className, focus, setAttributes }) {
        const {
            cardImageID,
            cardImageUrl,
            cardImageDescription,
            cardTitle,
            cardContent,
            cardContentBgColor,
            cardTitleColor,
            cardContentColor,
            cardEffect
        } = attributes;

        const updateCardTitle = cardTitle => setAttributes({ cardTitle });
        const updateCardContent = cardContent => setAttributes({ cardContent });
        const updateCardImageDescription = cardImageDescription => setAttributes({ cardImageDescription });
        const updateCardContentBgColor = cardContentBgColor => setAttributes({ cardContentBgColor });
        const updateCardTitleColor = cardTitleColor => setAttributes({ cardTitleColor });
        const updateCardContentColor = cardContentColor => setAttributes({ cardContentColor });
        const updateCardEffect = cardEffect => setAttributes({ cardEffect });

        const { divBgImageStyle, divStyle, titleStyle } = applyStyles(cardImageUrl || flipCard.defaultImageUrl, cardContentBgColor, cardTitleColor, cardContentColor);

        return (
            <Fragment>
                <div className={"flip-container " + cardEffect}>
                    <div className="flipper">
                        <div className="front" style={divBgImageStyle}>
                            <span className="name">{cardImageDescription}</span>
                        </div>
                        <div className="back"
                            style={divStyle}>
                            <div className="back-title" style={titleStyle}>{cardTitle}</div>
                            <p>{cardContent}</p>
                        </div>
                    </div>
                </div>
                <InspectorControls>
                    <PanelBody title={__("Front card settings", "gutextra")}>
                        {!cardImageID && (
                            <Placeholder
                                instructions={__('Override default Cat image', 'gutextra')}
                                icon="format-image"
                                label={"Image"}
                            >
                                <div className="thumbnail">
                                    <div className="centered">
                                        <MediaUpload
                                            onSelect={(media) => setAttributes({
                                                cardImageUrl: media.url,
                                            })}
                                            type="image"
                                            render={({ open }) => (
                                                <Fragment>
                                                    <img src={flipCard.defaultImageUrl} alt="" onClick={open} />
                                                    <Button isLarge onClick={open}>
                                                        {__(
                                                            "Insert from Media Library",
                                                            'gutextra'
                                                        )}
                                                    </Button>
                                                </Fragment>
                                            )}
                                        />
                                    </div>
                                </div>
                            </Placeholder>)}
                        {cardImageID && (
                            <Placeholder
                                instructions={__("Change image", 'gutextra')}
                                icon="format-image"
                                label={"Image"}>
                                <div className="thumbnail">
                                    <div className="centered">
                                        <MediaUpload
                                            onSelect={(media) => setAttributes({
                                                cardImageUrl: media.url,
                                                cardImageID: media.id
                                            })}
                                            type="image"
                                            value={cardImageID}
                                            render={({ open }) => (
                                                <img src={cardImageUrl} alt=""
                                                    onClick={open} />
                                            )}
                                        />
                                    </div>
                                </div>
                            </Placeholder>
                        )}
                        <TextControl
                            label={__('Card Image description', 'gutextra')}
                            value={cardImageDescription}
                            help={__('This will not appear, this is meant to describe image in empty div with background image.', 'gutextra')}
                            placeholder={__('Enter description…', 'gutextra')}
                            onChange={updateCardImageDescription}
                        />
                    </PanelBody>
                    <PanelBody initialOpen={false} title={__("Back card settings", "gutextra")}>
                        <TextControl
                            label={__('Card Title', 'gutextra')}
                            value={cardTitle}
                            placeholder={__('Enter title…', 'gutextra')}
                            onChange={updateCardTitle}
                        />
                        <TextareaControl
                            label="Text"
                            help={__('Enter content…', 'gutextra')}
                            value={cardContent}
                            onChange={updateCardContent}
                        />
                        <PanelColorSettings
                            colorSettings={[
                                {
                                    value: cardTitleColor,
                                    onChange: updateCardTitleColor,
                                    label: __('Title Color text', 'gutextra'),
                                },
                            ]}>
                        </PanelColorSettings>
                        <PanelColorSettings
                            colorSettings={[
                                {
                                    value: cardContentColor,
                                    onChange: updateCardContentColor,
                                    label: __('Card content color', 'gutextra'),
                                },
                            ]}>
                        </PanelColorSettings>
                        <PanelColorSettings
                            colorSettings={[
                                {
                                    value: cardContentBgColor,
                                    onChange: updateCardContentBgColor,
                                    label: __('Card Background color', 'gutextra'),
                                },
                            ]}>
                        </PanelColorSettings>
                    </PanelBody>
                    <PanelBody initialOpen={false} title={__("Effect settings", "gutextra")}>
                        <SelectControl
                            label={__("Type of card effect", "gutextra")}
                            value={cardEffect}
                            options={[
                                { label: __('Flip horizontally', 'gutextra'), value: '' },
                                { label: __('Flip vertically', 'gutextra'), value: 'vertical' },
                            ]}
                            onChange={updateCardEffect}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    },

    save({ attributes }) {
        const {
            cardImageUrl,
            cardImageDescription,
            cardTitle,
            cardContent,
            cardContentBgColor,
            cardTitleColor,
            cardContentColor,
            cardEffect
        } = attributes;

        const { divBgImageStyle, divStyle, titleStyle } = applyStyles(cardImageUrl || flipCard.defaultImageUrl, cardContentBgColor, cardTitleColor, cardContentColor);

        return (
            <div className={"flip-container " + cardEffect}>
                <div className="flipper">
                    <div className="front" style={divBgImageStyle}>
                        <span className="name">{cardImageDescription}</span>
                    </div>
                    <div className="back"
                        style={divStyle}>
                        <div className="back-title" style={titleStyle}>{cardTitle}</div>
                        <p>{cardContent}</p>
                    </div>
                </div>
            </div>
        );
    }
});