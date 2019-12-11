import {Injectable} from '@angular/core';

export interface DocItem {
  id: string;
  name: string;
  summary?: string;
  packageName?: string;
  examples?: string[];
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

const COMPONENTS = 'components';
const LAYOUTS = 'layouts';
export const SECTIONS: {[key: string]: DocSection} = {
  [COMPONENTS]: {
    name: 'Components',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo cursus semper. Vivamus vel quam hendrerit, lobortis libero a, imperdiet augue. Duis in purus felis'
  },
  [LAYOUTS]: {
    name: 'Layouts',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo cursus semper. Vivamus vel quam hendrerit, lobortis libero a, imperdiet augue. Duis in purus felis'
  },
};


const DOCS: {[key: string]: DocCategory[]} = {
  [COMPONENTS]: [
    {
      id: 'footer',
      name: 'Structure',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      items: [
        {
          id: 'footer',
          name: 'Footer',
          summary: 'Footer component for SAM.gov',
          examples: [
            'footer-overview'
          ]
        }
      ]
    }
  ],
  [LAYOUTS] : [
    {
      id: 'category',
      name: 'Category',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      items: [
        {id: 'test-component',
          name: 'Test 1',
          summary: 'This is just an example',
          examples: [
            'my-example',
          ]
        },
        {
          id: 'another-test-component',
          name: 'Another Test Component',
          summary: 'This is another test component',
          examples: []
        },
      ]
    },
    // TODO(jelbourn): re-add utilities and a11y as top-level categories once we can generate
    // their API docs with dgeni. Currently our setup doesn't generate API docs for constants
    // and standalone functions (much of the utilities) and we have no way of generating API
    // docs more granularly than directory-level (within a11y) (same for viewport).
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
