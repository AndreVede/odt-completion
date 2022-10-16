# odt-completion
Write in odt

Pour utiliser, rien de plus simple.

`var odt = require('path/index');
var myOdt = new odt.Odt('path/my.odt')`

Les variables sont écrites dans l'odt sous cette forme : \{\{variableName\}\}.
Pour changer sa valeur : 
`myOdt.changeVariable('variableName', 'valeur de remplacement');`
Et à la fin des opérations, pour récupérer un Odt : 
`myOdt.recreateOdtFile();`
