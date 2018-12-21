import { ManagedReact } from "managed-react";
import { LocalDatabase } from './localDatabase';

export const DatabaseService = ManagedReact.create({
    User:"users",

    Company:"companies",
    Members:"company_members",
    

    TerminalGroup:"terminal_groups",
    TerminalGroupMember:"terminal_group_members",
    Terminal:"terminals",


    Screen:"screens",


    Playlist:"playlists",
    PlaylistItem:"playlist_items",
    Asset:"assets"


})
.use({
    db:LocalDatabase
}).logic((state,dispatch,services)=>{

    let api =   Object.entries(state)
    .reduce((acc,[key,value])=>{
        return {...acc,[key]:services.db.defaults([]).get(value)}
    },{}) as {[P in keyof typeof state]:any}


    return api;

}).build()