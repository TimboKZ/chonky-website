/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import './InterfaceDocs.css';

import path from 'path';
import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

import typedocData from '../typedoc.json';

export interface InterfaceDocsProps {
    name: string;
}

export const InterfaceDocs: React.FC<InterfaceDocsProps> = ({ name }) => {
    const { data, source, interfaceFields } = useInterfaceData(name);
    const sourceLink = useMemo(
        () =>
            path.join(
                'https://github.com/TimboKZ/Chonky/tree/2.x/packages/chonky',
                `${source.fileName}#L${source.line}`
            ),
        [source]
    );

    const fieldComponents = useMemo(() => {
        const components = [];
        for (let i = 0; i < interfaceFields.length; ++i) {
            const field = interfaceFields[i];
            components.push(
                <div key={`field-${i}`} className="interface-field">
                    <div className="interface-field-title">
                        <code>
                            <strong>{field.name}</strong>:{' '}
                            {renderType(field.type, field.flags.isOptional)}
                        </code>
                        {field.flags.isOptional ? (
                            <span className="optional">optional</span>
                        ) : (
                            <span className="required">required</span>
                        )}
                    </div>
                    <div className="interface-field-description">
                        <ReactMarkdown>{field.comment?.shortText}</ReactMarkdown>
                    </div>
                </div>
            );
        }
        return components;
    }, [interfaceFields]);

    return (
        <React.Fragment>
            <div>
                If you prefer reading raw Typescript definitions (like me), you can view
                this interface and other relevant types on GitHub:{' '}
                <a href={sourceLink}>
                    <code>{source.fileName}</code>
                </a>
            </div>
            {fieldComponents}
            {/*<pre style={{ fontSize: 10, lineHeight: '10px' }}>*/}
            {/*    {JSON.stringify(data, null, 4)}*/}
            {/*</pre>*/}
        </React.Fragment>
    );
};

const useInterfaceData = (name: string) => {
    return useMemo(() => {
        // Extract interface data
        const interfaceData = typedocData.children.find((item) => item.name === name);
        if (!interfaceData) throw new Error(`Could not find interface ${name}.`);

        // Sort by line number
        const interfaceFields: any[] = interfaceData.children!;
        const getSourcePosition = (node: any) => {
            const { line, character } = node.sources[0];
            return parseFloat(`${line}.${character}`);
        };
        interfaceFields.sort((a: any, b: any) => {
            const x = getSourcePosition(a);
            const y = getSourcePosition(b);
            if (x < y) return -1;
            if (x > y) return 1;
            return 0;
        });

        return {
            data: interfaceData,
            source: interfaceData.sources[0],
            interfaceFields,
        };
    }, [name]);
};

const renderType = (data: any, optional: boolean = false): string => {
    if (data.type === 'intrinsic') return data.name;
    if (data.type === 'reference') {
        if (data.typeArguments) {
            const args = data.typeArguments.map(renderType).join(', ');
            return `${data.name}<${args}>`;
        } else {
            return data.name;
        }
    }
    if (data.type === 'union') {
        let type: string;
        if (optional) {
            type = data.types
                .map(renderType)
                .filter((t: string) => t !== 'undefined')
                .join(' | ');
        } else {
            type = data.types.map(renderType).join(' | ');
        }
        if (type === 'false | true') return 'boolean';
        else return type;
    }
    if (data.type === 'array') {
        return `${renderType(data.elementType)}[]`;
    }
    if (data.type === 'typeOperator') {
        return `${data.operator} ${renderType(data.target)}`;
    }
    if (data.type === 'reflection') {
        return '<...>';
    }
    return `:::${data.type}:::`;
};
