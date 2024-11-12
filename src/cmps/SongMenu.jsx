import { Menu, MenuItem, Divider } from '@mui/material';
import { ChevronRight } from 'lucide-react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import { AddIcon, AddToQueue, GoToArtist, GoToAlbum, GoToRadio, ViewCredits, Share, Embed, Copy, ArrowRight } from '../assets/img/menu/icons';
import { LikeIconLike } from '../assets/img/player/icons';
import { SpotifyIcon } from '../assets/img/app-header/icons';


export default function SongMenu({ onClose, ...props }) {

    const [playlistAnchor, setPlaylistAnchor] = useState(null)
    const [shareAnchor, setShareAnchor] = useState(null)

    const handlePlaylistOpen = (event) => {
        event.preventDefault()
        setPlaylistAnchor(event.currentTarget)
    }

    const handleShareOpen = (event) => {
        event.preventDefault()
        setShareAnchor(event.currentTarget)
    }

    const handleClose = () => {
        setPlaylistAnchor(null)
        setShareAnchor(null)
    }

    const handleMenuItemClick = () => {
        onClose()
    }

    return (
        <>
            <Menu  {...props} onClose={onClose} className="menu">
                <MenuItem onClick={handlePlaylistOpen} className="submenu-trigger">
                    <div className="nested-menu">
                       <AddIcon/>Add to playlist
                        <ArrowRight className="nested-menu-end" />
                    </div>
                </MenuItem>
                <MenuItem>
                    <LikeIconLike/> Save to your Liked Songs
                </MenuItem>
                <MenuItem>
                    <AddToQueue/> Add to queue
                </MenuItem>
                <Divider />
                <MenuItem>
                    <GoToRadio /> Go to song radio
                </MenuItem>
                <MenuItem>
                    <GoToArtist/> Go to artist
                </MenuItem>
                <MenuItem>
                    <GoToAlbum/> Go to album
                </MenuItem>
                <MenuItem>
                    <ViewCredits/> View credits
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleShareOpen} className="submenu-trigger">
                    <div className="">
                        <Share/> Share
                        <ChevronRight className="h-4 w-4" />
                    </div>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <SpotifyIcon/> Open in Desktop app
                </MenuItem>
            </Menu>
            <Menu
                anchorEl={playlistAnchor}
                open={Boolean(playlistAnchor)}
                onClose={handleClose}
                className="menu submenu"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <MenuItem className="search-item">
                    <input
                        type="text"
                        placeholder="Find a playlist"
                        className="w-full bg-transparent border-none outline-none text-white" />
                </MenuItem>
                <MenuItem>
                   <AddIcon/> New playlist
                </MenuItem>
                <Divider />
                <MenuItem>My Playlist #48</MenuItem>
                <MenuItem>Colors</MenuItem>
                <MenuItem>Summer 23</MenuItem>
                <MenuItem>Springtime</MenuItem>
            </Menu>
            <Menu
                anchorEl={shareAnchor}
                open={Boolean(shareAnchor)}
                onClose={handleClose}
                className="menu submenu"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <MenuItem><Copy/> Copy song link</MenuItem>
                <MenuItem> <Embed/>Embed track</MenuItem>
            </Menu>
        </>

    );
}