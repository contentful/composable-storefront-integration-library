/// <reference types="jest" />

import {
    SchematicTestRunner,
    UnitTestTree,
  } from '@angular-devkit/schematics/testing';
  import {
    Schema as ApplicationOptions,
    Style,
  } from '@schematics/angular/application/schema';
  import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
  import {
    CONTENTFUL_FEATURE_NAME,
    SPARTACUS_SCHEMATICS,
    SPARTACUS_CONTENTFUL,
    SpartacusOptions,
    SpartacusContentfulOptions,
    contentfulFeatureModulePath,
  } from '@spartacus/schematics';
  import * as path from 'path';
  import { peerDependencies } from '../../package.json';
  
  const collectionPath = path.join(__dirname, '../collection.json');
  
  describe('Spartacus SmartEdit schematics: ng-add', () => {
    const schematicRunner = new SchematicTestRunner(
      SPARTACUS_CONTENTFUL,
      collectionPath
    );
  
    let appTree: UnitTestTree;
  
    const workspaceOptions: WorkspaceOptions = {
      name: 'workspace',
      version: '0.5.0',
    };
  
    const appOptions: ApplicationOptions = {
      name: 'schematics-test',
      inlineStyle: false,
      inlineTemplate: false,
      style: Style.Scss,
      skipTests: false,
      projectRoot: '',
      standalone: false,
    };
  
    const spartacusDefaultOptions: SpartacusOptions = {
      project: 'schematics-test',
      lazy: true,
      features: [],
    };
  
    const libraryNoFeaturesOptions: SpartacusContentfulOptions = {
      project: 'schematics-test',
      lazy: true,
      features: [],
    };
  
    const contentfulFeatureOptions: SpartacusContentfulOptions = {
      ...libraryNoFeaturesOptions,
      features: [CONTENTFUL_FEATURE_NAME],
    };
  
    beforeEach(async () => {
      schematicRunner.registerCollection(
        SPARTACUS_SCHEMATICS,
        '../../projects/schematics/src/collection.json'
      );
  
      appTree = await schematicRunner.runExternalSchematic(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      );
  
      appTree = await schematicRunner.runExternalSchematic(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      );
  
      appTree = await schematicRunner.runExternalSchematic(
        SPARTACUS_SCHEMATICS,
        'ng-add',
        { ...spartacusDefaultOptions, name: 'schematics-test' },
        appTree
      );
    });
  
    describe('Without features', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          libraryNoFeaturesOptions,
          appTree
        );
      });
  
      it('should not create any of the feature modules', () => {
        expect(appTree.exists(contentfulFeatureModulePath)).toBeFalsy();
      });
  
      it('should install necessary Spartacus libraries', () => {
        const packageJson = JSON.parse(appTree.readContent('package.json'));
        let dependencies: Record<string, string> = {};
        dependencies = { ...packageJson.dependencies };
        dependencies = { ...dependencies, ...packageJson.devDependencies };
  
        for (const toAdd in peerDependencies) {
          // skip the SPARTACUS_SCHEMATICS, as those are added only when running by the Angular CLI, and not in the testing environment
          if (
            !peerDependencies.hasOwnProperty(toAdd) ||
            toAdd === SPARTACUS_SCHEMATICS
          ) {
            continue;
          }
          // TODO: after 4.0: use this test, as we'll have synced versions between lib's and root package.json
          // const expectedVersion = (peerDependencies as Record<
          //   string,
          //   string
          // >)[toAdd];
          const expectedDependency = dependencies[toAdd];
          expect(expectedDependency).toBeTruthy();
          // expect(expectedDependency).toEqual(expectedVersion);
        }
      });
    });
  
    describe('SmartEdit feature', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner.runSchematic(
            'ng-add',
            contentfulFeatureOptions,
            appTree
          );
        });
  
        it('should add the feature using the lazy loading syntax', async () => {
          const module = appTree.readContent(contentfulFeatureModulePath);
          expect(module).toMatchSnapshot();
        });
  
        describe('assets', () => {
          it('should update angular.json', async () => {
            const content = appTree.readContent('/angular.json');
            expect(content).toMatchSnapshot();
          });
        });
      });
  
      describe('eager loading', () => {
        beforeEach(async () => {
          appTree = await schematicRunner.runSchematic(
            'ng-add',
            { ...contentfulFeatureOptions, lazy: false },
            appTree
          );
        });
  
        it('should import appropriate modules', async () => {
          const module = appTree.readContent(contentfulFeatureModulePath);
          expect(module).toMatchSnapshot();
        });
      });
  
      describe('with storefrontPreviewRoute config', () => {
        beforeEach(async () => {
          appTree = await schematicRunner.runSchematic(
            'ng-add',
            {
              ...contentfulFeatureOptions,
              storefrontPreviewRoute: 'cx-preview',
            },
            appTree
          );
        });
  
        it('should configure the storefrontPreviewRoute', async () => {
          const module = appTree.readContent(contentfulFeatureModulePath);
          expect(module).toMatchSnapshot();
        });
      });
  
      describe('with allowOrigin config', () => {
        beforeEach(async () => {
          appTree = await schematicRunner.runSchematic(
            'ng-add',
            {
              ...contentfulFeatureOptions,
              allowOrigin: 'localhost:9002',
            },
            appTree
          );
        });
  
        it('should configure the allowOrigin', async () => {
          const module = appTree.readContent(contentfulFeatureModulePath);
          expect(module).toMatchSnapshot();
        });
      });
    });
  });
  