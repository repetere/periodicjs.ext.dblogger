'use strict';

let data_attributes = [
    { label: 'ID', sortactive: true, sortid: '_id', sortorder: 'asc' },
    { label: 'Create Date', sortactive: true, sortid: 'createdat', sortorder: 'asc' },
    { label: 'Expire Date', sortactive: true, sortid: 'createdat', sortorder: 'asc' },
    { label: 'Hostname', sortactive: true, sortid: 'hostname', sortorder: 'asc' },
    { label: 'Level', sortactive: true, sortid: 'level', sortorder: 'asc' },
    { label: 'Message', sortactive: true, sortid: 'msg', sortorder: 'asc' },
    { label: 'Options' },
];

let tbody_function = function(options) {
    let { Moment, locals } = options;
    return {
        tag: 'tr',
        style: 'vertical-align:top;',
        html: function(obj) {
            var jsontablehtml;
            jsontablehtml = `<td>
						<a href="/${locals.adminPath}/content/dbloggers/${obj._id}" class="async-admin-ajax-link">${obj._id}</a>
						</td>`;
            jsontablehtml += `<td>${new Moment(obj.createdat).format('MM/DD/YYYY (hh:mm:ssa)')}</td>`;
            jsontablehtml += `<td>${new Moment(obj.createdat).add(obj.ttl,'seconds').format('MM/DD/YYYY (hh:mm:ssa)')}</td>`;
            jsontablehtml += `<td>${ obj.hostname }</td>`;
            jsontablehtml += `<td>${ obj.level }</td>`;
            jsontablehtml += `<td>${ obj.msg.split('\n')[0] }</td>`;
            jsontablehtml += `<td><a href="/${ locals.adminPath }/content/dbloggers/${ obj._id }/" class="async-admin-ajax-link">edit</a>`;
            jsontablehtml += ` | <a alt="delete" data-ajax-method="delete" class=" ts-dialog-delete" data-href="/${ locals.adminPath }/content/dbloggers/${ obj._id }/" data-deleted-redirect-href="/${ locals.adminPath }/content/dbloggers">delete</a>`;
            jsontablehtml += '</td>';
            return jsontablehtml;
        }
    };
};

module.exports = function(resources) {

    return {
        dblogger_table: {
            data_attributes,
            responsive_collapse: {
                getCollapseNameFunction: function(obj) {
                    return obj.email;
                },
                editlink: `/${ resources.app.locals.adminPath }/content/dbloggers/|||_id|||`,
                deletelink: `/${ resources.app.locals.adminPath }/content/dbloggers/|||_id|||/delete`,
                deleterefreshlink: `/${ resources.app.locals.adminPath }/content/dbloggers/`
            },
            tbody: tbody_function,
        }
    };
};