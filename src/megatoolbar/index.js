import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { AlignmentToolbar, BlockControls, RichText, } from "@wordpress/block-editor";

import { IconButton, Toolbar, Tooltip, } from "@wordpress/components";

import { Fragment } from "@wordpress/element";
import "./style.scss";
import { Duplication, Linkify } from "./components/utils";

registerBlockType(
  'gutextra/megatoolbar',
  {
    title: __("Mega Toolbar", "gutextra"),
    description: __("A powerful toolbar for Gutenberg richtext", "gutextra"),
    icon: 'editor-kitchensink',
    category: 'common',
    keywords: [
      __('custom toolbar', 'gutextra'),
      __('button', 'gutextra'),
      __('toolbar', 'gutextra'),
    ],

    attributes: {
      content: {
        type: 'string',
      },
      alignment: {
        type: 'string',
      }
    },
    edit({ attributes, className, setAttributes }) {

      const { content, alignment } = attributes;

      return (
        <Fragment>
          <BlockControls>
            <AlignmentToolbar
              value={alignment}
              onChange={alignment => setAttributes({ alignment })}
            />
            <Toolbar>
              <Tooltip text={__('Trash content', 'gutextra')}>
                <IconButton
                  className="megatoolbar__controls-trash"
                  icon="trash"
                  onClick={() => setAttributes({ content: '' })}
                />
              </Tooltip>
              <Tooltip text={__('Duplicate content', 'gutextra')}>
                <IconButton
                  className="megatoolbar__controls-duplicate"
                  icon="admin-page"
                  onClick={() => setAttributes({ content: Duplication(content) })}
                />
              </Tooltip>
              <Tooltip text={__('Linkify hashtags (#) & user(@) for Twitter URLs', 'gutextra')}>
                <IconButton
                  className="megatoolbar__controls-twitter-linkify"
                  icon="twitter"
                  onClick={() => setAttributes({ content: Linkify(content) })}
                />
              </Tooltip>
            </Toolbar>
          </BlockControls>
          <RichText
            format="string"
            tagName="div"
            multiline="p"
            value={content}
            className="megatoolbar-content"
            onChange={content => setAttributes({ content })}
            style={{ textAlign: alignment }}
          />
        </Fragment>
      )
    },
    save({ attributes, className }) {

      const { content, alignment } = attributes;

      return (
        <div style={{ textAlign: alignment }} className={className}>
          <RichText.Content format="string" value={content} />
        </div>
      )
    },
  }
)