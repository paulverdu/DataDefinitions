<?php

declare(strict_types=1);

/*
 * This source file is available under two different licenses:
 *  - GNU General Public License version 3 (GPLv3)
 *  - Data Definitions Commercial License (DDCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) CORS GmbH (https://www.cors.gmbh) in combination with instride AG (https://instride.ch)
 * @license    GPLv3 and DDCL
 */

namespace Instride\Bundle\DataDefinitionsBundle\Command;

use CoreShop\Component\Resource\Repository\RepositoryInterface;
use Instride\Bundle\DataDefinitionsBundle\Model\ImportDefinitionInterface;
use Pimcore\Console\AbstractCommand;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

final class ListImportDefinitionsCommand extends AbstractCommand
{
    protected RepositoryInterface $repository;

    public function __construct(
        RepositoryInterface $repository,
    ) {
        $this->repository = $repository;

        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->setName('data-definitions:list:imports')
            ->setDescription('List all Import Definitions.')
            ->setHelp(
                <<<EOT
The <info>%command.name%</info> lists all Data Definitions for Imports.
EOT
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $importDefinitions = $this->repository->findAll();

        $data = [];

        /** @var ImportDefinitionInterface $definition */
        foreach ($importDefinitions as $definition) {
            $data[] = [
                $definition->getId(),
                $definition->getName(),
                $definition->getProvider(),
            ];
        }

        $table = new Table($output);
        $table
            ->setHeaders(['ID', 'Name', 'Provider'])
            ->setRows($data)
        ;
        $table->render();

        return 0;
    }
}
