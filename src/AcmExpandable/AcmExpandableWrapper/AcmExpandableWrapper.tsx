import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { AcmButton } from '../../AcmButton/AcmButton'
import { Title, Gallery, GalleryItem } from '@patternfly/react-core'

type AcmExpandableWrapperProps = {
    headerLabel?: string
    children: React.ReactNode
    maxHeight?: string
    withCount: boolean
    expandable: boolean
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    headerCount: {
        fontWeight: 'lighter',
    },
    wrapperContainer: {
        margin: '1rem 0',
    },
    gallery: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    },
    hideExtras: {
        maxHeight: (props: AcmExpandableWrapperProps) => props.maxHeight,
        overflow: 'hidden',
    },
    showAllButton: {
        margin: '1rem auto',
    },
})

export const AcmExpandableWrapper = (props: AcmExpandableWrapperProps) => {
    const { children, headerLabel, withCount, expandable } = props
    const classes = useStyles(props)
    const [showAll, setShowAll] = useState<boolean>(false)

    return (
        <div className={classes.root}>
            {headerLabel && (
                <Title headingLevel="h4">
                    {headerLabel}
                    {withCount && (
                        <span className={classes.headerCount}> {`( ${React.Children.count(children)} total )`}</span>
                    )}
                </Title>
            )}
            <div
                className={
                    showAll ? `${classes.wrapperContainer}` : `${classes.wrapperContainer} ${classes.hideExtras}`
                }
            >
                <Gallery hasGutter className={classes.gallery}>
                    {React.Children.map(props.children, (child, idx) => {
                        return (
                            <GalleryItem>
                                <div key={`item-${idx}`}>{child}</div>
                            </GalleryItem>
                        )
                    })}
                </Gallery>
            </div>
            {expandable && (
                <AcmButton className={classes.showAllButton} variant={'secondary'} onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Show less' : `Show all (${React.Children.count(children)})`}
                </AcmButton>
            )}
        </div>
    )
}
