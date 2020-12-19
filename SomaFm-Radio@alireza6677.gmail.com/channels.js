const Lang = imports.lang;
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;
const PopupMenu = imports.ui.popupMenu;
const Extension = imports.misc.extensionUtils.getCurrentExtension();
const Gio = imports.gi.Gio;
const GObject = imports.gi.GObject;
const Data = Extension.imports.data;

const channels = 
[
{ name: "BAGeL Radio",            link: "http://ice4.somafm.com/bagel-128-aac",            pic: "/images/bagel-400.png",            num:0},
{ name: "Beat Blender",           link: "http://ice6.somafm.com/beatblender-128-aac",        pic: "/images/beatblender-400.png",      num:1},
{ name: "Black Rock FM",          link: "http://ice4.somafm.com/brfm-128-aac",             pic: "/images/brfm-400.png",             num:2},
{ name: "Boot Liquor",            link: "http://ice2.somafm.com/bootliquor-128-aac",         pic: "/images/bootliquor-400.png",       num:3},
{ name: "Christmas Lounge",       link: "http://ice4.somafm.com/christmas-128-aac",        pic: "/images/christmas-400.jpg",        num:4},
{ name: "Christmas Rocks!",       link: "http://ice6.somafm.com/xmasrocks-128-aac",        pic: "/images/xmasrocks-400.png",        num:4},
{ name: "cliqhop idm",            link: "http://ice6.somafm.com/cliqhop-128-aac",          pic: "/images/cliqhop-400.png",          num:6},
{ name: "Covers",                 link: "http://ice6.somafm.com/covers-128-aac",           pic: "/images/covers-400.png",           num:7},
{ name: "Deep Space One",         link: "http://ice4.somafm.com/deepspaceone-128-aac",       pic: "/images/deepspaceone-400.png",     num:8},
{ name: "DEF CON Radio",          link: "http://ice6.somafm.com/defcon-128-aac",           pic: "/images/defcon400.png",            num:9},
{ name: "Digitalis",              link: "http://ice2.somafm.com/digitalis-128-aac",        pic: "/images/digitalis-400.png",        num:10},
{ name: "Drone Zone",             link: "http://ice4.somafm.com/dronezone-128-aac",        pic: "/images/dronezone-400.png",        num:11},
{ name: "Dub Step Beyond",        link: "http://ice4.somafm.com/dubstep-128-aac",          pic: "/images/dubstep-400.png",          num:12},
{ name: "Fluid",                  link: "http://ice4.somafm.com/fluid-128-aac",            pic: "/images/fluid-400.jpg",            num:13},
{ name: "Folk Forward",           link: "http://ice6.somafm.com/folkfwd-128-aac",          pic: "/images/folkfwd-400.jpg",          num:14},
{ name: "Groove Salad Classic",   link: "http://ice6.somafm.com/gsclassic-128-aac",         pic: "/images/gsclassic400.jpg",         num:15},
{ name: "Groove Salad",           link: "http://ice2.somafm.com/groovesalad-128-aac",         pic: "/images/groovesalad-400.png",      num:16},
{ name: "Heavyweight Reggae",     link: "http://ice4.somafm.com/reggae-128-aac",           pic: "/images/reggae400.png",            num:17},
{ name: "Illinois Street Lounge", link: "http://ice6.somafm.com/illstreet-128-aac",        pic: "/images/illstreet-400.jpg",        num:18},
{ name: "Indie Pop Rocks!",       link: "http://ice2.somafm.com/indiepop-128-aac",         pic: "/images/indiepop-400.png",         num:19},
{ name: "Jolly Ol' Soul",         link: "http://ice2.somafm.com/jollysoul-128-aac",        pic: "/images/jollysoul-400.png",        num:20},
{ name: "Left Coast 70s",         link: "http://ice4.somafm.com/seventies-128-aac",        pic: "/images/seventies400.jpg",         num:21},
{ name: "Lush",                   link: "http://ice6.somafm.com/lush-128-aac",             pic: "/images/lush-400.jpg",             num:22},
{ name: "Metal Detector",         link: "http://ice4.somafm.com/metal-128-aac",            pic: "/images/metal-400.png",            num:23},
{ name: "Mission Control",        link: "http://ice1.somafm.com/missioncontrol-128-aac",     pic: "/images/missioncontrol-400.png",   num:24},
{ name: "n5MD Radio",             link: "http://ice6.somafm.com/n5md-128-aac",             pic: "/images/n5md-400.png",             num:25},
{ name: "PopTron",                link: "http://ice6.somafm.com/poptron-128-aac",          pic: '/images/poptron-400.png',          num:26},
{ name: "Secret Agent",           link: "http://ice6.somafm.com/secretagent-128-aac",        pic: "/images/secretagent-400.png",      num:27},
{ name: "Seven Inch Soul",        link: "http://ice2.somafm.com/7soul-128-aac",            pic: "/images/7soul-400.jpg",            num:28},
{ name: "SF 10-33",               link: "http://ice2.somafm.com/sf1033-128-aac",           pic: "/images/sf1033-400.png",           num:29},
{ name: "SF Police Scanner",      link: "http://ice2.somafm.com/scanner-128-aac",           pic: "/images/scanner-400.jpg",          num:30},
{ name: "SomaFM Live",            link: "http://ice2.somafm.com/live-128-aac",             pic: "/images/live-400.jpg",             num:31},
{ name: "SomaFM Specials",        link: "http://ice4.somafm.com/specials-128-aac",         pic: "/images/specials-400.jpg",         num:32},
{ name: "Sonic Universe",         link: "http://ice4.somafm.com/sonicuniverse-128-aac",      pic: "/images/sonicuniverse-400.png",    num:33},
{ name: "Space Station Soma",     link: "http://ice2.somafm.com/spacestation-128-aac",       pic: "/images/spacestation-400.png",     num:34},
{ name: "Suburbs of Goa",         link: "http://ice4.somafm.com/suburbsofgoa-128-aac",       pic: "/images/suburbsofgoa-400.png",     num:35},
{ name: "The Trip",               link: "http://ice6.somafm.com/thetrip-128-aac",          pic: "/images/thetrip-400.jpg",          num:36},
{ name: "ThistleRadio",           link: "http://ice2.somafm.com/thistle-128-aac",          pic: "/images/thistle-400.jpg",          num:37},
{ name: "Underground 80s",        link: "http://ice4.somafm.com/u80s-128-aac",             pic: "/images/u80s-400.png",             num:38},
{ name: "Vaporwaves",             link: "http://ice4.somafm.com/vaporwaves-128-aac",         pic: "/images/vaporwaves400.png",        num:39},
{ name: "Xmas in Frisko",         link: "http://ice2.somafm.com/xmasinfrisko-128-aac",       pic: "/images/xmasinfrisko-400.jpg",     num:40},
];

var Channel = class Channel{

    constructor(name, link, pic ,num , fav) {
        this.name = name;
        this.link = link;
        this.pic = pic;
        this.num = num;
        this.fav = fav;
    }

    getName() {
        return this.name;
    }

    getLink() {
        return this.link;
    }

    getPic() {
        return this.pic;
    }

    getNum(){
        return this.num;
    }

    isFav(){
        return this.fav;
    }

    setFav(f){
        this.fav = f;
    }

};

var ChannelBox = GObject.registerClass(class ChannelBox extends PopupMenu.PopupBaseMenuItem {

    _init(channel, player, popup) {
        super._init({
          reactive: true,
          can_focus: true,
        });
        this.player = player;
        this.channel = channel;
        this.popup = popup;

        this.vbox = new St.BoxLayout({ vertical: false });
        this.add_child(this.vbox);

        let icon2 = new St.Icon({
          gicon: Gio.icon_new_for_string(Extension.path + channel.getPic()),
          style:'margin-right:10px',
          icon_size:60,
        });

        let box2 = new St.BoxLayout({ vertical: false });
        let label1 = new St.Label({
          text: channel.getName(),
          y_align: Clutter.ActorAlign.CENTER,
          y_expand: true,
        });
        this.vbox.add_child(icon2);
        this.vbox.add_child(box2);
        box2.add(label1);

    }

    activate(ev) {
        this.player.stop();
        this.player.setChannel(this.channel);
        this.player.play();
        this.popup.channelChanged();
    }
});

function getChannels() {
    return channels.map(ch => new Channel(ch.name, ch.link, ch.pic, ch.num , Data.isFav(ch.num)));
}

function getFavChannels() {
    return channels.filter(ch => Data.isFav(ch.num)).map(ch => new Channel(ch.name, ch.link, ch.pic, ch.num , true));
}

function getChannel(index) {
    let item = channels[index];
    return new Channel(item.name, item.link, item.pic , item.num , Data.isFav(item.num));
}
