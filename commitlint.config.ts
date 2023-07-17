import { execSync } from 'child_process';
import fg from 'fast-glob';

const getPackages = packagePath => fg.sync('*', { cwd: packagePath, onlyDirectories: true });

const scopes = [
  ...getPackages('packages'),
  ...getPackages('internal'),
  'docs',
  'play',
  'project',
  'core',
  'style',
  'ci',
  'dev',
  'deploy',
  'other',
  'typography',
  'color',
  'border',
  'var',
  'ssr',
  'blog',
];

const gitStatus = execSync('git status --porcelain || true').toString().trim().split('\n');

const scopeComplete = gitStatus
  .find(r => ~r.indexOf('M  packages'))
  ?.replace(/\//g, '%%')
  ?.match(/packages%%((\w|-)*)/)?.[1];

const subjectComplete = gitStatus
  .find(r => ~r.indexOf('M  packages/components'))
  ?.replace(/\//g, '%%')
  ?.match(/packages%%components%%((\w|-)*)/)?.[1];

export default {
  rules: {
    /**
     * type[scope]: [function] description
     *
     * 作用域类型:例如:菜单,header,footer等
     *      ^^^^^
     */
    'scope-enum': [2, 'always', scopes],
    /**
     * type[scope]: [function] description
     *
     * ^^^^^^^^^^^^^^ empty line.
     * - Something here
     */
    'body-leading-blank': [1, 'always'],
    /**
     * type[scope]: [function] description
     *
     * - something here
     *
     * ^^^^^^^^^^^^^^
     */
    'footer-leading-blank': [1, 'always'],
    /**
     * type[scope]: [function] description [No more than 72 characters]
     *      ^^^^^
     */
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [1, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    /**
     * type[scope]: [function] description
     * ^^^^
     */
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'build',
        'chore',
        'ci',
        'docs',
        'md',
        'perf',
        'refactor',
        'revert',
        'release',
        'style',
        'test',
        'improvement',
        'types',
        'workflow',
        'wip',
      ],
    ],
  },
  prompt: {
    messages: {
      // type: "Select the type of change that you're committing: ",
      // scope: 'Denote the SCOPE of this change (optional):',
      // customScope: 'Denote the SCOPE of this change:',
      // subject: 'Write a SHORT, IMPERATIVE tense description of the change:n',
      // body: 'Provide a LONGER description of the change (optional). Use ' | ' to break new line:n',
      // breaking: 'List any BREAKING CHANGES (optional). Use ' | ' to break new line:n',
      // footerPrefixsSelect: 'Select the ISSUES type of changeList by this change (optional):',
      // customFooterPrefixs: 'Input ISSUES prefix:',
      // footer: 'List any ISSUES by this change. E.g.: #31, #34:n',
      // confirmCommit: 'Are you sure you want to proceed with the commit above?'

      // 中文版
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :n',
      body: '填写更加详细的变更描述（可选）。使用  |  换行 :n',
      breaking: '列举非兼容性重大的变更（可选）。使用  |  换行 :n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :n',
      confirmCommit: '是否提交或修改commit ?',
    },
    // types: [
    //   { value: 'feat', name: 'feat:     新增功能' },
    //   { value: 'fix', name: 'fix:      修复缺陷' },
    //   { value: 'docs', name: 'docs:     文档变更' },
    //   { value: 'style', name: 'style:    代码格式' },
    //   { value: 'refactor', name: 'refactor: 代码重构' },
    //   { value: 'perf', name: 'perf:     性能优化' },
    //   { value: 'test', name: 'test:     添加疏漏测试或已有测试改动' },
    //   { value: 'build', name: 'build:    构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)' },
    //   { value: 'ci', name: 'ci:       修改 CI 配置、脚本' },
    //   { value: 'revert', name: 'revert:   回滚 commit' },
    //   { value: 'chore', name: 'chore:    对构建过程或辅助工具和库的更改 (不影响源文件、测试用例)' },
    //   { value: 'wip', name: 'wip:      正在开发中' },
    //   { value: 'workflow', name: 'workflow: 工作流程改进' },
    //   { value: 'types', name: 'types:    类型定义文件修改' },
    // ],
    defaultScope: scopeComplete,
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
    defaultSubject: subjectComplete && `[${subjectComplete}] `,
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false,
  },
};
