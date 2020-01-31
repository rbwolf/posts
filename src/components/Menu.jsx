import React from 'react';
import { 
    Drawer, List, ListItem, ListItemIcon,
    ListItemText, ListItemProps
} from '@material-ui/core'
import MailIcon from '@material-ui/icons/Mail'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

const Menu = ({open, onClose}) => {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <List>
                <ListItem component='a' button>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Email' secondary='rdbaerwolf@gmail.com'/>
                    <ListItemLink href='mailto:rdbaerwolf@gmail.com'/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><LinkedInIcon /></ListItemIcon>
                    <ListItemText primary='LinkedIn' secondary='linkedin.com/in/ryanbaerwolf'/>
                    <ListItemLink href='https://www.linkedin.com/in/ryanbaerwolf' primary='LinkedIn' secondary='linkedin.com/in/ryanbaerwolf'/>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Menu