import {Injectable} from '@angular/core';

export interface AdditionalApiDoc {
  name: string;
  path: string;
}

export interface DocItem {
  id: string;
  name: string;
  summary?: string;
  packageName?: string;
  examples?: string[];
  additionalApiDocs?: AdditionalApiDoc[];
}

export interface DocCategory {
  id: string;
  name: string;
  items: DocItem[];
  summary?: string;
}

export interface DocSection {
  name: string;
  summary: string;
}

const LAYOUTS = 'layouts';
const COMPONENTS = 'components';
export const SECTIONS: {[key: string]: DocSection} = {
  [COMPONENTS]: {
    name: 'Components',
    summary: 'The components are a collection of user interface controls including buttons,' +
    ' menus, filtering and form controls, modal dialogs and alerts, and many others.'
  },
  [LAYOUTS]: {
    name: 'Layouts',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum turpis felis, faucibus in mattis ut, porttitor a arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras accumsan orci sit amet laoreet egestas. Aliquam gravida tempus aliquam.'
  },
};


const DOCS: {[key: string]: DocCategory[]} = {
  [COMPONENTS]: [
    {
      id: 'brand',
      name: 'Branding',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      items: [
        {
          id: 'footer',
          name: 'Footer',
          summary: 'A page footer',
          examples: [
            'footer-overview'
          ]
        }
      ]
    }
  ],
  [LAYOUTS] : [
    {
      id: 'menu',
      name: 'Menu Patterns',
      summary: 'Actions Menu, Subheader menu...',
      items: [
        {
          id: 'actions-menu',
          name: 'Action Menu',
          summary: 'Lorem ipsum dolor sit amet',
          examples: []
        },
      ]
    }
  ]
};

for (let category of DOCS[COMPONENTS]) {
  for (let doc of category.items) {
    doc.packageName = 'components';
  }
}

for (let category of DOCS[LAYOUTS]) {
  for (let doc of category.items) {
    doc.packageName = 'layouts';
  }
}

const ALL_COMPONENTS = DOCS[COMPONENTS].reduce(
  (result: DocItem[], category: DocCategory) => result.concat(category.items), []);
const ALL_LAYOUTS = DOCS[LAYOUTS].reduce(
  (result: DocItem[], layouts: DocCategory) => result.concat(layouts.items), []);
const ALL_DOCS = ALL_COMPONENTS.concat(ALL_LAYOUTS);
const ALL_CATEGORIES = DOCS[COMPONENTS].concat(DOCS[LAYOUTS]);

@Injectable()
export class DocumentationItems {
  getCategories(section: string): DocCategory[] {
    return DOCS[section];
  }

  getItems(section: string): DocItem[] {
    if (section === COMPONENTS) {
      return ALL_COMPONENTS;
    }
    if (section === LAYOUTS) {
      return ALL_LAYOUTS;
    }
    return [];
  }

  getItemById(id: string, section: string): DocItem | undefined {
    const sectionLookup = section == 'layouts' ? 'layouts' : 'components';
    return ALL_DOCS.find(doc => doc.id === id && doc.packageName == sectionLookup);
  }

  getCategoryById(id: string): DocCategory | undefined {
    return ALL_CATEGORIES.find(c => c.id == id);
  }
}
