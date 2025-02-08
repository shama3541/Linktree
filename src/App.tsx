import React, { useState } from 'react';
import {
  Github,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Globe,
  Pencil,
  Plus,
  Trash2,
  Check,
  X,
  Facebook,
  Linkedin,
  Music,
  Video,
  Link as LinkIcon,
  Palette,
} from 'lucide-react';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
}

interface Theme {
  background: string;
  buttonStyle: string;
  fontFamily: string;
  buttonRadius: string;
  buttonOpacity: string;
}

const availableIcons = {
  Github,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Globe,
  Facebook,
  Linkedin,
  Music,
  Video,
  Link: LinkIcon,
};

const backgroundOptions = [
  { name: 'Purple to Pink', value: 'bg-gradient-to-br from-purple-500 to-pink-500' },
  { name: 'Blue to Cyan', value: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
  { name: 'Orange to Red', value: 'bg-gradient-to-br from-orange-500 to-red-500' },
  { name: 'Green to Teal', value: 'bg-gradient-to-br from-green-500 to-teal-500' },
  { name: 'Indigo to Purple', value: 'bg-gradient-to-br from-indigo-500 to-purple-500' },
  { name: 'Solid Dark', value: 'bg-gray-900' },
  { name: 'Solid Light', value: 'bg-gray-100' },
];

const buttonStyleOptions = [
  { name: 'Glass', value: 'bg-white bg-opacity-20 backdrop-blur-lg' },
  { name: 'Solid White', value: 'bg-white' },
  { name: 'Solid Dark', value: 'bg-gray-800' },
  { name: 'Bordered', value: 'bg-transparent border-2 border-white' },
];

const fontFamilyOptions = [
  { name: 'Sans', value: 'font-sans' },
  { name: 'Serif', value: 'font-serif' },
  { name: 'Mono', value: 'font-mono' },
];

const radiusOptions = [
  { name: 'None', value: 'rounded-none' },
  { name: 'Small', value: 'rounded' },
  { name: 'Medium', value: 'rounded-lg' },
  { name: 'Large', value: 'rounded-xl' },
  { name: 'Full', value: 'rounded-full' },
];

const opacityOptions = [
  { name: '100%', value: 'bg-opacity-100' },
  { name: '75%', value: 'bg-opacity-75' },
  { name: '50%', value: 'bg-opacity-50' },
  { name: '25%', value: 'bg-opacity-25' },
];

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [isThemeEditing, setIsThemeEditing] = useState(false);
  const [name, setName] = useState('Jane Doe');
  const [bio, setBio] = useState('Digital Creator | Web Developer | Content Creator');
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200');
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>({
    background: backgroundOptions[0].value,
    buttonStyle: buttonStyleOptions[0].value,
    fontFamily: fontFamilyOptions[0].value,
    buttonRadius: radiusOptions[2].value,
    buttonOpacity: opacityOptions[1].value,
  });

  const [links, setLinks] = useState<LinkItem[]>([
    { id: '1', title: 'Portfolio Website', url: 'https://example.com', icon: 'Globe' },
    { id: '2', title: 'GitHub', url: 'https://github.com', icon: 'Github' },
    { id: '3', title: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' },
    { id: '4', title: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
  ]);

  const [newLink, setNewLink] = useState<Partial<LinkItem>>({
    title: '',
    url: '',
    icon: 'Link',
  });

  const addLink = () => {
    if (newLink.title && newLink.url) {
      setLinks([
        ...links,
        {
          id: Date.now().toString(),
          title: newLink.title,
          url: newLink.url,
          icon: newLink.icon || 'Link',
        },
      ]);
      setNewLink({ title: '', url: '', icon: 'Link' });
    }
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const updateLink = (id: string, updatedLink: Partial<LinkItem>) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, ...updatedLink } : link
    ));
    setEditingLinkId(null);
  };

  const IconComponent = ({ iconName }: { iconName: string }) => {
    const Icon = availableIcons[iconName as keyof typeof availableIcons] || availableIcons.Link;
    return <Icon className="w-5 h-5" />;
  };

  const getTextColor = () => {
    return theme.background.includes('bg-gray-100') ? 'text-gray-900' : 'text-white';
  };

  const getLinkStyles = () => {
    return `${theme.buttonStyle} ${theme.buttonRadius} ${
      theme.buttonStyle.includes('bg-white') ? theme.buttonOpacity : ''
    } hover:scale-[1.02] transition-all`;
  };

  return (
    <div className={`min-h-screen ${theme.background} p-4 sm:p-8 ${theme.fontFamily}`}>
      <div className="max-w-2xl mx-auto">
        <div className="absolute top-4 right-4 flex space-x-2">
          {isEditing && (
            <button
              onClick={() => setIsThemeEditing(!isThemeEditing)}
              className={`${getLinkStyles()} p-2 rounded-full`}
            >
              <Palette className={`w-5 h-5 ${getTextColor()}`} />
            </button>
          )}
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setIsThemeEditing(false);
            }}
            className={`${getLinkStyles()} p-2 rounded-full`}
          >
            {isEditing ? (
              <Check className={`w-5 h-5 ${getTextColor()}`} />
            ) : (
              <Pencil className={`w-5 h-5 ${getTextColor()}`} />
            )}
          </button>
        </div>

        {isThemeEditing && (
          <div className={`${getLinkStyles()} p-4 mb-8`}>
            <h2 className={`text-lg font-bold mb-4 ${getTextColor()}`}>Theme Settings</h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${getTextColor()}`}>
                  Background
                </label>
                <select
                  value={theme.background}
                  onChange={(e) => setTheme({ ...theme, background: e.target.value })}
                  className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
                >
                  {backgroundOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${getTextColor()}`}>
                  Button Style
                </label>
                <select
                  value={theme.buttonStyle}
                  onChange={(e) => setTheme({ ...theme, buttonStyle: e.target.value })}
                  className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
                >
                  {buttonStyleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${getTextColor()}`}>
                  Font Family
                </label>
                <select
                  value={theme.fontFamily}
                  onChange={(e) => setTheme({ ...theme, fontFamily: e.target.value })}
                  className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
                >
                  {fontFamilyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${getTextColor()}`}>
                  Button Radius
                </label>
                <select
                  value={theme.buttonRadius}
                  onChange={(e) => setTheme({ ...theme, buttonRadius: e.target.value })}
                  className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
                >
                  {radiusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${getTextColor()}`}>
                  Button Opacity
                </label>
                <select
                  value={theme.buttonOpacity}
                  onChange={(e) => setTheme({ ...theme, buttonOpacity: e.target.value })}
                  className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
                >
                  {opacityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className={`flex flex-col items-center mb-8 ${getTextColor()}`}>
          {isEditing ? (
            <>
              <div className="mb-4 relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <input
                  type="text"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  className="mt-2 p-2 rounded bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 w-full text-sm"
                  placeholder="Image URL..."
                />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`text-2xl font-bold mb-2 bg-transparent text-center border-b border-current border-opacity-50 focus:outline-none focus:border-opacity-100 ${getTextColor()}`}
              />
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className={`text-lg text-center bg-transparent border-b border-current border-opacity-50 focus:outline-none focus:border-opacity-100 ${getTextColor()}`}
              />
            </>
          ) : (
            <>
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4"
              />
              <h1 className="text-2xl font-bold mb-2">{name}</h1>
              <p className="text-lg opacity-90 text-center">{bio}</p>
            </>
          )}
        </div>

        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="relative group">
              {isEditing && editingLinkId === link.id ? (
                <div className={getLinkStyles() + ' p-4'}>
                  <div className="flex flex-col space-y-2">
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => updateLink(link.id, { title: e.target.value })}
                      className="bg-white bg-opacity-20 rounded p-2 text-white"
                      placeholder="Link Title"
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => updateLink(link.id, { url: e.target.value })}
                      className="bg-white bg-opacity-20 rounded p-2 text-white"
                      placeholder="URL"
                    />
                    <select
                      value={link.icon}
                      onChange={(e) => updateLink(link.id, { icon: e.target.value })}
                      className="bg-white bg-opacity-20 rounded p-2 text-white"
                    >
                      {Object.keys(availableIcons).map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingLinkId(null)}
                        className="p-2 rounded bg-white bg-opacity-20 hover:bg-opacity-30"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateLink(link.id, link)}
                        className="p-2 rounded bg-white bg-opacity-20 hover:bg-opacity-30"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  href={isEditing ? undefined : link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-4 ${getLinkStyles()}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent iconName={link.icon} />
                      <span className={`font-medium ${getTextColor()}`}>{link.title}</span>
                    </div>
                    {isEditing ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingLinkId(link.id)}
                          className="p-1 rounded hover:bg-white hover:bg-opacity-20"
                        >
                          <Pencil className={`w-4 h-4 ${getTextColor()}`} />
                        </button>
                        <button
                          onClick={() => deleteLink(link.id)}
                          className="p-1 rounded hover:bg-white hover:bg-opacity-20"
                        >
                          <Trash2 className={`w-4 h-4 ${getTextColor()}`} />
                        </button>
                      </div>
                    ) : (
                      <svg
                        className={`w-5 h-5 opacity-75 ${getTextColor()}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </div>
                </a>
              )}
            </div>
          ))}

          {isEditing && (
            <div className={`${getLinkStyles()} p-4`}>
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  className="bg-white bg-opacity-20 rounded p-2 text-white"
                  placeholder="New Link Title"
                />
                <input
                  type="text"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="bg-white bg-opacity-20 rounded p-2 text-white"
                  placeholder="New Link URL"
                />
                <select
                  value={newLink.icon}
                  onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                  className="bg-white bg-opacity-20 rounded p-2 text-white"
                >
                  {Object.keys(availableIcons).map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
                <button
                  onClick={addLink}
                  className={`flex items-center justify-center space-x-2 ${getLinkStyles()} p-2`}
                >
                  <Plus className={`w-4 h-4 ${getTextColor()}`} />
                  <span className={getTextColor()}>Add Link</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <footer className={`mt-12 text-center text-sm opacity-75 ${getTextColor()}`}>
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;