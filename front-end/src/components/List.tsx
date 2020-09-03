// tslint:disable: no-any
import * as React from 'react';
import styled from 'styled-components';

interface ListWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    gap?: number;
    wrap?: boolean;
    direction?: string;
    alignItems?: string;
}

export const ListWrapper = styled.div<ListWrapperProps>`
    width: 100%
    display: flex;
    flex-direction: ${props => props.direction || 'row'}; 
    align-items: ${props => props.alignItems || 'flex-start'};
    flex-wrap: ${props => props.wrap ? 'wrap' : 'no-wrap'}
    gap: ${props => props.gap || 10}px;
`;

interface ListProps {
    list: any[];
    emptyState?: React.ReactNode;
    renderItem: (item: any, index: number, array: any[]) => React.ReactNode;
}

const List: React.FunctionComponent<ListProps> = ({list, renderItem, emptyState: EmptyState}) => {
    return (
        <>
            {
                list && list.length > 0
                    ? list.map(renderItem)
                    : EmptyState || null
            }
        </>
    );
};

export default List;